"use client";

import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "./queries";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "./languageContext";
import { CharactersData, Character } from "./types";

const Home = () => {
  const { t, language, setLanguage } = useLanguage();
  const [status, setStatus] = useState<string | null>(null);
  const [species, setSpecies] = useState<string | null>(null);
  const [page] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);

  const { data, loading, error, fetchMore, refetch } = useQuery<CharactersData>(
    GET_CHARACTERS,
    {
      variables: { page, status, species },
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
    }
  );

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data?.characters.results) {
      let updatedCharacters = [...characters, ...data.characters.results];

      if (status) {
        updatedCharacters = updatedCharacters.filter(
          (char) => char.status === status
        );
      }
      if (species) {
        updatedCharacters = updatedCharacters.filter(
          (char) => char.species === species
        );
      }

      updatedCharacters = updatedCharacters.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

      const uniqueCharacters = Array.from(
        new Map(updatedCharacters.map((char) => [char.id, char])).values()
      );

      setCharacters(uniqueCharacters);
    }
  }, [data, status, species]);

  useEffect(() => {
    if (status !== null || species !== null) {
      console.log("Refetching with filters:", { status, species });
      refetch({ status, species, page: 1 }); // Refetch when status or species change
    }
  }, [status, species, refetch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && data?.characters.info.next) {
          fetchMore({
            variables: { page: data.characters.info.next },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              fetchMoreResult.characters.results = [
                ...prevResult.characters.results,
                ...fetchMoreResult.characters.results,
              ];
              return fetchMoreResult;
            },
          });
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [data, fetchMore]);

  if (loading && characters.length === 0) return <div>{t("Loading...")}</div>;
  if (error) return <div>{t("Error loading data.")}</div>;

  const localizedCharacters = characters.map((character) => ({
    ...character,
    status: t(character.status),
    species: t(character.species),
    gender: t(character.gender),
    origin: { name: t(character.origin.name) },
  }));

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value || null;
    setStatus(newStatus);
  };

  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpecies = e.target.value || null;
    setSpecies(newSpecies);
  };

  const handleResetFilters = () => {
    setStatus(null);
    setSpecies(null);
    refetch({ status: null, species: null, page: 1 });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{t("Rick and Morty Characters")}</h1>
      <div className="my-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <select
            className="border p-2 rounded-lg"
            value={status || ""}
            onChange={handleStatusChange}
          >
            <option value="">{t("All Status")}</option>
            <option value="Alive">{t("Alive")}</option>
            <option value="Dead">{t("Dead")}</option>
            <option value="unknown">{t("Unknown")}</option>
          </select>

          <select
            className="border p-2 rounded-lg"
            value={species || ""}
            onChange={handleSpeciesChange}
          >
            <option value="">{t("All Species")}</option>
            <option value="Human">{t("Human")}</option>
            <option value="Alien">{t("Alien")}</option>
            <option value="Humanoid">{t("Humanoid")}</option>
            <option value="Robot">{t("Robot")}</option>
            <option value="Cronenberg">{t("Cronenberg")}</option>
          </select>

          <button
            className="border p-2 rounded-lg"
            onClick={handleResetFilters}
          >
            {t("Reset Filters")}
          </button>
        </div>
        <button
          className="border p-2 ml-auto rounded-lg"
          onClick={() => setLanguage(language === "en" ? "de" : "en")}
        >
          {t("Switch Language")}
        </button>
      </div>

      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-white uppercase bg-blue-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("Name")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("Status")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("Species")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("Gender")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("Origin")}
              </th>
            </tr>
          </thead>
          <tbody>
            {localizedCharacters.map((character: Character) => (
              <tr key={character.id} className="border-b bg-gray-200">
                <th className="px-6 py-4">{character.name}</th>
                <th className="px-6 py-4">{character.status}</th>
                <th className="px-6 py-4">{character.species}</th>
                <th className="px-6 py-4">{character.gender}</th>
                <th className="px-6 py-4">{character.origin.name}</th>
              </tr>
            ))}
          </tbody>
        </table>
        <div ref={loaderRef} className="mt-4">
          {loading && <div>{t("Loading more...")}</div>}
        </div>
      </div>
    </div>
  );
};

export default Home;
