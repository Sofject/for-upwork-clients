#!/usr/bin/env python3
"""Extract person records from JSON (list or ES response) and write CSV.
"""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path
from typing import Any, Iterable


FIELDNAMES = [
    "name",
    "first_name",
    "last_name",
    "email",
    "personal_email_count",
    "linkedin_url",
    "title",
    "headline",
    "city",
    "state",
    "country",
    "functions",
    "languages",
    "latest_education",
    "current_company",
    "current_job_title",
    "latest_start_date",
    "employment_count",
]


DECISION_MAKER_TITLES = {
    'ceo', 'chief executive officer', 'founder', 'co-founder', 'cofounder',
    'cto', 'chief technology officer', 'cpo', 'cio', 'vp', 'vice president', 'director',
    'head', 'owner', 'partner', 'president', 'lead', 'manager'
}

TARGET_COUNTRIES = {'united states', 'usa', 'us', 'canada', 'uk', 'australia', 'germany'}
TARGET_INDUSTRIES = {'software', 'saas', 'tech', 'fintech', 'ecommerce', 'ai', 'data', 'cloud'}


def _state_path() -> Path:
    p = Path('data') / 'exp_state.json'
    p.parent.mkdir(parents=True, exist_ok=True)
    return p


def load_export_state() -> dict[str, Any]:
    try:
        return json.loads(_state_path().read_text(encoding='utf-8'))
    except Exception:
        state = {'last_exported_file': None, 'exported_files': []}
        save_export_state(state)
        return state


def save_export_state(state: dict[str, Any]) -> None:
    _state_path().write_text(json.dumps(state, indent=2), encoding='utf-8')


def get_records(payload: Any) -> list[dict[str, Any]]:
    """Normalize payload to list[dict]. Supports ES responses and plain lists."""
    if isinstance(payload, list):
        # list of ES hits (each has _source) or plain dicts
        if payload and isinstance(payload[0], dict) and '_source' in payload[0]:
            out: list[dict[str, Any]] = []
            for item in payload:
                if not isinstance(item, dict):
                    continue
                src = item.get('_source')
                if isinstance(src, dict):
                    out.append(src)
            return out
        return [p for p in payload if isinstance(p, dict)]

    if isinstance(payload, dict):
        hits = payload.get('hits')
        if isinstance(hits, dict):
            out: list[dict[str, Any]] = []
            for h in hits.get('hits', []):
                if not isinstance(h, dict):
                    continue
                src = h.get('_source')
                if isinstance(src, dict):
                    out.append(src)
            return out

    return []


def safe_join(values: Any, sep: str = ' | ') -> str:
    if not values:
        return ''
    if isinstance(values, list):
        return sep.join(str(v).strip() for v in values if v not in (None, ''))
    return str(values)


def pick_current_job(history: Any) -> tuple[str, str, str]:
    if not isinstance(history, list) or not history:
        return '', '', ''
    entries = [e for e in history if isinstance(e, dict)]
    current = [e for e in entries if e.get('current')]
    pool = current or entries
    best = max(pool, key=lambda x: x.get('start_date') or '')
    return str(best.get('organization_name') or ''), str(best.get('title') or ''), str(best.get('start_date') or '')


def pick_latest_education(education: Any) -> str:
    if not isinstance(education, list):
        return ''
    for edu in education:
        if not isinstance(edu, dict):
            continue
        parts = [str(edu.get(k) or '').strip() for k in ('campus', 'major')]
        combo = ' - '.join(p for p in parts if p)
        if combo:
            return combo
    return ''


def build_row(person: dict[str, Any]) -> dict[str, Any]:
    em = person.get('employment_history')
    pe = person.get('personal_emails')
    cc, ctitle, start = pick_current_job(em)
    return {
        'name': person.get('name', ''),
        'first_name': person.get('first_name', ''),
        'last_name': person.get('last_name', ''),
        'email': person.get('email', ''),
        'personal_email_count': len(pe) if isinstance(pe, list) else 0,
        'linkedin_url': person.get('linkedin_url', ''),
        'title': person.get('title', ''),
        'headline': person.get('headline', ''),
        'city': person.get('city', ''),
        'state': person.get('state', ''),
        'country': person.get('country', ''),
        'functions': safe_join(person.get('functions')),
        'languages': safe_join(person.get('languages')),
        'latest_education': pick_latest_education(person.get('education')),
        'current_company': cc,
        'current_job_title': ctitle,
        'latest_start_date': start,
        'employment_count': len(em) if isinstance(em, list) else 0,
    }


def iter_rows(records: Iterable[dict[str, Any]]) -> Iterable[dict[str, Any]]:
    for r in records:
        yield build_row(r)


def _text_for_industry(person: dict[str, Any]) -> str:
    parts = [person.get('current_company') or '', person.get('current_job_title') or '', person.get('title') or '', person.get('headline') or '']
    funcs = person.get('functions')
    if isinstance(funcs, list):
        parts.append(' '.join(str(x) for x in funcs))
    return ' '.join(str(p) for p in parts).lower()


def matches_filters(person: dict[str, Any]) -> bool:
    title_text = ' '.join([person.get('current_job_title') or '', person.get('title') or '', person.get('headline') or '']).lower()
    if not any(t in title_text for t in DECISION_MAKER_TITLES):
        return False
    country = str(person.get('country') or '').lower()
    if not any(c in country for c in TARGET_COUNTRIES):
        return False
    industry_text = _text_for_industry(person)
    if not any(k in industry_text for k in TARGET_INDUSTRIES):
        return False
    return True


def get_json_files_in_data() -> list[Path]:
    d = Path('data')
    if not d.exists():
        return []
    return sorted([p for p in d.glob('*.json') if p.name not in {'exp_state.json'} and not p.name.endswith('_state.json')])


def write_csv(path: Path, rows: Iterable[dict[str, Any]]) -> int:
    rows = list(rows)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=FIELDNAMES)
        w.writeheader()
        w.writerows(rows)
    return len(rows)


def process_auto_export(apply_filters: bool) -> None:
    state = load_export_state()
    files = get_json_files_in_data()
    if not files:
        print('No JSON files found in data/')
        return
    start = 0
    if state.get('last_exported_file'):
        for i, p in enumerate(files):
            if p.name == state['last_exported_file']:
                start = i + 1
                break

    for src in files[start:]:
        print('Processing', src.name)
        payload = json.loads(src.read_text(encoding='utf-8'))
        records = get_records(payload)
        if apply_filters:
            records = [r for r in records if matches_filters({**r, **{'current_company': pick_current_job(r.get('employment_history'))[0], 'current_job_title': pick_current_job(r.get('employment_history'))[1]}})]
        rows = list(iter_rows(records))
        out = Path('export') / (src.stem + '.csv')
        n = write_csv(out, rows)
        print(f'Wrote {n} rows to {out}')
        state['last_exported_file'] = src.name
        state.setdefault('exported_files', [])
        if src.name not in state['exported_files']:
            state['exported_files'].append(src.name)
        save_export_state(state)


def main() -> None:
    p = argparse.ArgumentParser(description='Extract person data from JSON to CSV')
    p.add_argument('--input', default='data.json')
    p.add_argument('--output', default='people_extracted.csv')
    p.add_argument('--no-filter', dest='apply_filters', action='store_false')
    p.add_argument('--auto', action='store_true')
    args = p.parse_args()

    if args.auto:
        process_auto_export(args.apply_filters)
        return

    payload = json.loads(Path(args.input).read_text(encoding='utf-8'))
    records = get_records(payload)
    if args.apply_filters:
        records = [r for r in records if matches_filters({**r, **{'current_company': pick_current_job(r.get('employment_history'))[0], 'current_job_title': pick_current_job(r.get('employment_history'))[1]}})]
    rows = list(iter_rows(records))
    n = write_csv(Path(args.output), rows)
    print(f'Wrote {n} rows to {args.output}')


if __name__ == '__main__':
    main()
