import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MapContainer, TileLayer } from "react-leaflet";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";
import "leaflet/dist/leaflet.css";
import WorldMap from "../components/WorldMap";

interface CountryInfo {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    _id: string;
    lat: number;
    long: number;
  };
}

const fetchCountriesData = async (): Promise<CountryInfo[]> => {
  const response = await axios.get("https://disease.sh/v3/covid-19/countries");
  return response.data;
};

const fetchChartData = async (): Promise<any> => {
  const response = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  const data = response.data;

  const newChartData = {
    labels: Object.keys(data.cases),
    datasets: [
      {
        label: "Cases",
        data: Object.values(data.cases),
        fill: true,
        backgroundColor: "rgba(200, 200, 200, 0.2)", // Custom background color (gray)
        borderColor: "#4e79a7", // Custom color for the line (blue)
        borderWidth: 2,
        pointRadius: 5, // Larger point radius for more emphasis on data points
        pointBackgroundColor: "#4e79a7", // Color of the data points (blue)
        pointBorderColor: "#ffffff", // Color of the data point borders (white)
        pointBorderWidth: 2,
        tension: 0.4, // Moderate tension for a curved line
      },
    ],
  };

  return newChartData;
};

const Dashboard: React.FC = () => {
  const countriesDataQuery = useQuery<CountryInfo[]>(
    "countriesData",
    fetchCountriesData
  );
  const chartDataQuery = useQuery<any>("chartData", fetchChartData);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  if (countriesDataQuery.isLoading || chartDataQuery.isLoading) {
    return (
      <h1 className="text-pink-600 mb-4 font-bold text-2xl">Loading...</h1>
    );
  }

  if (countriesDataQuery.isError || chartDataQuery.isError) {
    return (
      <h1 className="text-pink-600 mb-4 font-bold text-2xl">
        Error occurred while fetching data.
      </h1>
    );
  }

  const countriesData = countriesDataQuery.data!;
  const chartData = chartDataQuery.data!;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard" />
      <div className="  w-full pt-20 px-4 pb-8">
        <h1 className="text-4xl font-bold mb-4 text-center text-white border-4 border-purple-500 bg-black bg-opacity-75 py-3 px-6 rounded-lg">
          Corona Cases Chart
        </h1>

        <div className="border-2 border-red-100 w-11/12  m-auto 10 auto 10">
          {chartData.datasets ? (
            <Line data={chartData} />
          ) : (
            <h1 className="text-pink-600 mb-4 font-bold text-2xl">
              Loading...
            </h1>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4 text-center text-white border-4 border-purple-500 bg-black bg-opacity-75 py-3 px-6 rounded-lg my-6">
          Corona Cases World Map
        </h1>
        <div className="border-2 border-blue-500 w-11/12  m-auto 5 auto 5">
          <MapContainer
            className="m-auto w-full  border-blue-700"
            bounds={[
              [-60, -180],
              [85, 180],
            ]}
            zoom={2}
            center={[20, 40]}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            />

            <WorldMap countriesData={countriesData} />
          </MapContainer>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
