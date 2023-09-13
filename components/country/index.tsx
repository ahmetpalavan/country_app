import ErrorComponent from "@/components/error";
import Loading from "@/components/loading";
import GET_COUNTRIES from "@/lib/getCountries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import TableComponent from "@/components/table";
import { Input } from "@/components/ui/input";

interface Country {
  code: string;
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  continent: {
    name: string;
  };
  languages: {
    code: string;
    name: string;
  }[];
}

export default function Country() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [filter, setFilter] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [groupedCountries, setGroupedCountries] = useState<Record<string, Country[]>>({});
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (data) {
      let filteredCountries = data.countries;
      let newGroupedCountries: Record<string, Country[]> = {};

      if (filter) {
        const filterText = filter.toLowerCase();
        filteredCountries = data.countries.filter(
          (country: Country) =>
            country.name?.toLowerCase().includes(filterText) ||
            country.native?.toLowerCase().includes(filterText) ||
            country.capital?.toLowerCase().includes(filterText) ||
            country.continent?.name?.toLowerCase().includes(filterText) ||
            country.currency?.toLowerCase().includes(filterText) ||
            country.languages?.some((language) => language.name.toLowerCase().includes(filterText)) ||
            country.emoji?.toLowerCase().includes(filterText)
        );
      }

      if (group === "continent") {
        filteredCountries.forEach((country: Country) => {
          if (!newGroupedCountries[country.continent.name]) {
            newGroupedCountries[country.continent.name] = [];
          }
          newGroupedCountries[country.continent.name].push(country);
        });
      } else {
        newGroupedCountries["All"] = filteredCountries;
      }

      setGroupedCountries(newGroupedCountries);

      const allCountries = Object.values(newGroupedCountries).flat();
      const selectIndex = allCountries.length < 10 ? allCountries.length - 1 : 9;
      if (allCountries[selectIndex]) {
        setSelectedCountry(allCountries[selectIndex].code);
      } else {
        setSelectedCountry(null);
      }
      console.log("allCountries", allCountries[selectIndex]);
    }
  }, [data, filter, group]);

  if (loading) return <Loading color="blue" type="spin" />;
  if (error) return <ErrorComponent onRetry={handleRetry} />;

  const headers = ["Name", "Native Name", "Flag", "Capital", "Currency", "Continent"];

  const rows = Object.values(groupedCountries)
    .flat()
    .map((country: Country) => [country.name, country.native, country.emoji, country.capital, country.currency, country.continent.name]);

  const handleRowClick = (rowIndex: number) => {
    const selected = rows[rowIndex];
    if (selected) {
      const selectedCountryCode = Object.values(groupedCountries).flat()[rowIndex]?.code;
      if (selectedCountryCode) {
        setSelectedCountry(selectedCountryCode);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="sticky top-0 z-50 bg-white p-2 flex items-center mb-4">
        <Input type="text" placeholder="Search..." onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded" />
        <select onChange={(e) => setGroup(e.target.value)} className="p-2 border rounded ml-2 h-9 border-input items-center">
          <option value="">All</option>
          <option value="continent">Continent</option>
        </select>
      </div>
      {rows.length === 0 ? (
        <div className="flex justify-center items-center">
          <span className="text-red-500 text-xl font-medium">No countries found!</span>
        </div>
      ) : (
        <TableComponent
          caption="Countries List"
          headers={headers}
          rows={rows}
          onRowClick={handleRowClick}
          selectedCountryCode={selectedCountry}
        />
      )}
    </div>
  );
}
