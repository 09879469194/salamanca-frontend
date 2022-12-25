import {
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Chart as ChartJS,
  ChartData,
  CategoryScale
} from 'chart.js'
import { collectionGroup, query } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { fetchPollens, getMovingAverage, getDataGraph, movingAverageOptions } from "./graph"
import { pollensList } from '../../data/arrays'
import { FirebaseContext } from '../../contexts/Auth/firebaseContext'
ChartJS.register(
  LinearScale,
  LineController,
  LineElement,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function Graph() {
  const [factor, setFactor] = useState(0.486)
  const [data, setData] = useState<ChartData<"line">>()
  const [pollenName, setPollenName] = useState("Acer")
  const { db } = useContext(FirebaseContext)
  const AcerQuery = query(collectionGroup(db, 'days'))
  const [pollens] = useCollectionDataOnce(AcerQuery)
  useEffect(() => {
    if (!pollens) return
    const dataFetch = fetchPollens(pollens)
    if (!dataFetch) return
    const dailyMap = getDataGraph({ pollens: dataFetch, pollenName, initialDate: new Date("11-12-2022") })
    const data = getMovingAverage({ dailyConcentrations: dailyMap, factor, pollenName: "Acer" })
    setData(data)
  }, [pollens, factor,pollenName])
  return (
    <div className="flex flex-col justify-center">
      <div className="px-8 flex justify-around items-center">
        <div className="">
          <h3 className="text-lg text-center">Select Pollen</h3>
        <select  className="text-lg text-center py-2 "name="pollen"required defaultValue={pollenName} onChange={(e)=>{
          const selectedPollen = e.target.value
          setPollenName(selectedPollen)          
        }}>
          {pollensList.map((pollen) => {
            return (
              <option key={pollen}value={pollen}>{pollen} </option>
            )
          }
          )}
        </select>
        </div>
          <div>
            <input type={"date"} defaultValue={"2022-12-22"} onChange={(el)=>{
              const date=new Date(el.target.value)
              console.log(new Date());
              
              console.log(date);
              
            }} id="initialDate" />
          </div>
        <div>
        <p className="text-lg font-bold text-black">Factor : {factor}</p>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={factor}
          onChange={(el) => setFactor(Number(el.target.value))}
        />
        </div>
      </div>
      <div className="max-h-[50vh] py-8">
        {data ? (
          <Line options={movingAverageOptions} data={data} width={2} height={2} />
        ) : (
          <div>
            <p>Sem data</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Graph
