import { createContext, useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { 
  useGetWorkspacesQuery, 
  useGetCampaignsQuery, 
  useGetListsQuery 
} from "../store/slices/workspaceSlice";

const WorkspaceContext = createContext();

export const useWorkspace = () => {
  return useContext(WorkspaceContext);
};

export const WorkspaceProvider = ({ children }) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const { 
    data: workspacesData,
    isLoading: isWorkspacesLoading,
    error: workspacesError
  } = useGetWorkspacesQuery(undefined, {
    skip: !token
  });

  const {
    data: campaignsData,
    isLoading: isCampaignsLoading
  } = useGetCampaignsQuery(selectedWorkspace?._id, {
    skip: !selectedWorkspace
  });

  const {
    data: listsData,
    isLoading: isListsLoading
  } = useGetListsQuery(selectedWorkspace?._id, {
    skip: !selectedWorkspace
  });

  // Set initial workspace when data is loaded
  useEffect(() => {
    if (workspacesData?.currentWorkspace && !selectedWorkspace) {
      setSelectedWorkspace(workspacesData.currentWorkspace);
    }
  }, [workspacesData]);

  // Handle errors
  useEffect(() => {
    if (workspacesError) {
      toast.error(workspacesError.message ?? "Error fetching workspaces");
    }
  }, [workspacesError]);

  const selectWorkspace = (workspaceId) => {
    const workspace = workspacesData?.find((ws) => ws.id === workspaceId);
    setSelectedWorkspace(workspace);
  };

  const loading = isWorkspacesLoading || isCampaignsLoading || isListsLoading;

  const value = {
    workspaces: workspacesData,
    selectedWorkspace,
    loading,
    selectWorkspace,
    campaigns: campaignsData?.updatedEmail ?? [],
    lists: listsData?.data?.docs ?? [],
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};
