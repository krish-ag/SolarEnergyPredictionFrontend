import React, { useState } from 'react'
import axios from 'axios'

export default function SolarEnergyPredictor() {
  const [radiation, setRadiation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    try {
      const response = await axios.post('/Radiation', data)
      setRadiation(response.data.Radiation)
    } catch (err) {
      setError('An error occurred while fetching the data. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-center mb-6">Solar Radiation Predictor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (Optional)</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="e.g., 27.4924,77.6737"
            // required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Predicting...' : 'Predict Radiation'}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600 text-center" role="alert">{error}</div>
      )}

      {radiation !== null && !error && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold">Predicted Radiation:</h3>
          <p className="text-3xl font-bold text-green-600">{radiation.toFixed(2)} W/m²</p>
        </div>
      )}
    </div>
  )
}