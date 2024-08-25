import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobs = () => {
  const { isLoaded } = useUser();
  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">Saved Jobs</h1>

      {loadingSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs?.length ? (
            savedJobs.map((saved) => (
              <JobCard
                key={saved?.id}
                job={saved?.job}
                savedInit={true}
                onJobSaved={fnSavedJobs}
              />
            ))
          ) : (
            <div className="mt-20 w-[85vw] font-extrabold text-xl text-center pb-8">No Saved Jobs Found 👀</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
