import { useEffect, useState } from "react"

const App = () => {

  const eightHoursThirtyMinutesInMilliseconds = (1000 * 60 * 60 * 8) + (1000 * 60 * 30)

  const getLocalTime = (timeInMS) => {
    const time = new Date(timeInMS)
    return time.toLocaleTimeString()
  }

  const [workingTime, setWorkingTime] = useState(eightHoursThirtyMinutesInMilliseconds)
  const [outTime, setOutTime] = useState(getLocalTime(Date.now() + workingTime))

  const [input, setInput] = useState({
    inTime: {
      hours: 9,
      minutes: 0
    }
  })

  const updateInputHandler = (inputType, data) => {
    if (inputType === "inTime-hours") {
      setInput(prevState => {
        return { ...prevState, inTime: { ...prevState.inTime, hours: data?.hours } }
      })
    }
    else if (inputType === "inTime-minutes") {
      setInput(prevState => {
        return { ...prevState, inTime: { ...prevState.inTime, minutes: data?.minutes } }
      })
    }
  }

  const convertToStandardTime = (hours, minutes) => {
    const time = new Date(new Date(Date.now()).toLocaleDateString() + " " + (hours < 9 ? ("0" + hours) : hours) + ":" + (minutes < 9 ? ("0" + minutes) : minutes));
    return time
  }

  useEffect(() => {
    const convertedToDateTime = convertToStandardTime(input.inTime.hours, input.inTime.minutes)
    const miliseconds = convertedToDateTime.getTime()
    const finalTime = miliseconds + workingTime
    const outTime = getLocalTime(finalTime)
    setOutTime(outTime)
  }, [input])

  return (
    <div>
      <div className="flex flex-row justify-center items-center pt-40">
        <h1>CDAC's Out-Time Calculator</h1>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="basis-4/12 border">
          <hr />
          Enter In-Time Hours : <input type="text" value={input.inTime.hours} onChange={(e) => { updateInputHandler("inTime-hours", { hours: e.target.value }) }} placeholder="Enter Hours" className="input input-bordered w-full max-w-xs" />
          <hr />
          Enter Out-Time Min {""} : <input type="text" value={input.inTime.minutes} onChange={(e) => { updateInputHandler("inTime-minutes", { minutes: e.target.value }) }} placeholder="Enter Minutes" className="input input-bordered w-full max-w-xs" />
          <hr />
          Exit Time : {outTime}
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div>
          Download (v1) Source Code from <a href="https://github.com/samnayakawadi/cdac-time-calculator">Here</a> | UI, Validations & More Features Coming Soon
          <br />
          Made by <a href="https://github.com/samnayakawadi">samnayakawadi</a>
        </div>
      </div>
    </div>
  )
}

export default App