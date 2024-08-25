// import { getCompanies } from "@/api/apiCompanies";
// import { getJobs } from "@/api/apiJobs";
// import JobCard from "@/components/JobCard";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import useFetch from "@/hooks/use-fetch";
// import { useUser } from "@clerk/clerk-react";
// import { Select } from "@radix-ui/react-select";
// import { City, State } from "country-state-city";
// import React, { useEffect, useState } from "react";
// import { BarLoader } from "react-spinners";

// const JobListing = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [location, setLocation] = useState("");
//   const [state, setState] = useState("");
//   const [company_id, setCompany_id] = useState("");
//   const { isLoaded } = useUser();

//   const {
//     fn: fnJobs,
//     data: jobs,
//     loading: loadingJobs,
//   } = useFetch(getJobs, { location, company_id, searchQuery });

//   const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

//   useEffect(() => {
//     if (isLoaded) {
//       fnCompanies();
//     }
//   }, [isLoaded]);

//   useEffect(() => {
//     if (isLoaded) fnJobs();
//   }, [isLoaded, location, company_id, searchQuery]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     let formData = new FormData(e.target);

//     const query = formData.get("search-query");
//     if (query) {
//       setSearchQuery(query);
//     }
//   };

//   const cearFilters = () => {
//     setCompany_id("");
//     setSearchQuery("");
//     setLocation("");
//   }

//   if (!isLoaded) {
//     return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
//   }

//   return (
//     <div>
//       <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
//         Latest Jobs
//       </h1>

//       {/* Add filters here */}
//       <form
//         className="h-14 flex w-full gap-2 items-center mb-3"
//         onSubmit={handleSearch}
//       >
//         <Input
//           type="text"
//           placeholder="Search jobs by title..."
//           name="search-query"
//           className="h-full flex-1 px-4 text-md"
//         />
//         <Button variant="blue" type="submit" className="h-full sm:w-28">
//           Search
//         </Button>
//       </form>

//       <div className="flex flex-col sm:flex-row gap-2">
//         <Select value={location} onValueChange={(value) => setLocation(value)}>
//           <SelectTrigger>
//             <SelectValue placeholder="Filter by state..." />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {State.getStatesOfCountry("IN").map(({name}) => {
//               {/* {City.getCitiesOfState("IN", "KA").map(({name}) => { */}
//                 return <SelectItem key={name} value={name}>
//                   {name}
//                 </SelectItem>
//               })}
//             </SelectGroup>
//           </SelectContent>
//         </Select>

//         <Select value={location} onValueChange={(value) => setLocation(value)}>
//           <SelectTrigger>
//             <SelectValue placeholder="Filter by location..." />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {State.getStatesOfCountry("IN").map(({name}) => {
//               {/* {City.getCitiesOfState("IN", "KA").map(({name}) => { */}
//                 return <SelectItem key={name} value={name}>
//                   {name}
//                 </SelectItem>
//               })}
//             </SelectGroup>
//           </SelectContent>
//         </Select>

//         <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
//           <SelectTrigger>
//             <SelectValue placeholder="Filter by Company..." />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {
//               companies?.map(({name, id}) => {
//                 return <SelectItem key={name} value={id}>{name}</SelectItem>
//               })}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//         <Button onClick={cearFilters} variant="destructive" className="sm:w-1/2">Clear Filters</Button>
//       </div>

//       {/* loader */}
//       {loadingJobs && (
//         <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
//       )}

//       {loadingJobs === false && (
//         <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {jobs?.length ? (
//             jobs.map((job) => {
//               return (
//                 <JobCard
//                   key={job.id}
//                   job={job}
//                   savedInit={job?.saved?.length > 0}
//                 />
//               );
//             })
//           ) : (
//             <div>No Jobs Found 🥲</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobListing;









import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { Select } from "@radix-ui/react-select";
import { City, State } from "country-state-city";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState(""); // State selection
  const [location, setLocation] = useState(""); // City selection
  const [company_id, setCompany_id] = useState("");
  const [cities, setCities] = useState([]);
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {location, company_id, searchQuery });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  useEffect(() => {
    // Fetch cities based on selected state
    if (selectedState) {
      try {
        const citiesList = City.getCitiesOfState("IN", selectedState); // Update based on country and state code
        setCities(citiesList);
      } catch (error) {
        console.error("Error fetching cities: ", error);
      }
    } else {
      setCities([]); // Clear cities if no state is selected
    }
  }, [selectedState]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) {
      setSearchQuery(query);
    }
  };

  const clearFilters = () => {
    setCompany_id("");
    setSearchQuery("");
    setLocation("");
    setSelectedState(""); // Clear state selection
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form
        className="h-14 flex w-full gap-2 items-center mb-3"
        onSubmit={handleSearch}
      >
        <Input
          type="text"
          placeholder="Search jobs by title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button variant="blue" type="submit" className="h-full sm:w-28">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        {/* State Selection */}
        <Select value={selectedState} onValueChange={(value) => setSelectedState(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name, isoCode }) => (
                <SelectItem key={isoCode} value={isoCode}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* City Selection */}
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by city..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {cities.map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <Button onClick={clearFilters} variant="destructive" className="sm:w-1/2">Clear Filters</Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved?.length > 0}
              />
            ))
          ) : (
            <div>No Jobs Found 🥲</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
