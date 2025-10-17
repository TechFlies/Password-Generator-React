import { useState, useEffect } from 'react'
import './App.css'

function App() {
	const [length, setLength] = useState(8)
	const [numberAllowed, setNumberAllowed] = useState(false)
	const [symbolAllowed, setSymbolAllowed] = useState(false)
	const [uppercaseAllowed, setUppercaseAllowed] = useState(true)
	const [lowercaseAllowed, setLowercaseAllowed] = useState(true)
	const [password, setPassword] = useState('')
	
	// New state for UI improvements
	const [copied, setCopied] = useState(false)
	const [strength, setStrength] = useState({ score: 0, label: 'Very Weak', color: 'bg-red-500' })

	// compute strength based on length and variety
	useEffect(() => {
		let score = 0
		if (length >= 8) score++
		if (length >= 12) score++
		if (uppercaseAllowed) score++
		if (lowercaseAllowed) score++
		if (numberAllowed) score++
		if (symbolAllowed) score++
		// normalize to 0..4
		const normalized = Math.min(4, Math.floor((score / 6) * 4))
		let label = 'Very Weak'
		let color = 'bg-red-500'
		if (normalized <= 0) { label = 'Very Weak'; color = 'bg-red-500' }
		else if (normalized === 1) { label = 'Weak'; color = 'bg-orange-500' }
		else if (normalized === 2) { label = 'Moderate'; color = 'bg-yellow-400' }
		else if (normalized === 3) { label = 'Strong'; color = 'bg-emerald-400' }
		else if (normalized >= 4) { label = 'Very Strong'; color = 'bg-green-500' }
		setStrength({ score: normalized, label, color })
	}, [length, uppercaseAllowed, lowercaseAllowed, numberAllowed, symbolAllowed])

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(password)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (e) {
			// ignore
		}
	}

	// improved generator: ensure at least one char from each selected type
	const generatePassword = () => {
		const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
		const numberChars = '0123456789'
		const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-='

		let characterPool = ''
		const guaranteed = []

		if (uppercaseAllowed) {
			characterPool += uppercaseChars
			guaranteed.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)])
		}
		if (lowercaseAllowed) {
			characterPool += lowercaseChars
			guaranteed.push(lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)])
		}
		if (numberAllowed) {
			characterPool += numberChars
			guaranteed.push(numberChars[Math.floor(Math.random() * numberChars.length)])
		}
		if (symbolAllowed) {
			characterPool += symbolChars
			guaranteed.push(symbolChars[Math.floor(Math.random() * symbolChars.length)])
		}

		if (characterPool.length === 0) {
			alert('Please select at least one character type.')
			return
		}

		let generatedPassword = guaranteed.join('')
		for (let i = generatedPassword.length; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characterPool.length)
			generatedPassword += characterPool[randomIndex]
		}
		// shuffle to avoid guaranteed chars at start
		generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('')
		setPassword(generatedPassword)
	}

	// new derived state and handler for "Select All"
	const allSelected = uppercaseAllowed && lowercaseAllowed && numberAllowed && symbolAllowed
	const toggleAll = () => {
		const next = !allSelected
		setUppercaseAllowed(next)
		setLowercaseAllowed(next)
		setNumberAllowed(next)
		setSymbolAllowed(next)
	}

	// Add a small accessible Toggle component for smooth toggles
	const Toggle = ({ label, checked, onChange }) => (
		<div className="flex items-center justify-between bg-gray-900 px-3 py-2 rounded">
			<span className="text-sm">{label}</span>
			<button
				type="button"
				role="switch"
				aria-checked={checked}
				onClick={() => onChange(!checked)}
				className={`w-12 h-6 flex items-center p-1 rounded-full transition-colors ${checked ? 'bg-blue-500' : 'bg-gray-600'}`}
			>
				<span className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
			</button>
		</div>
	)

	return (
		<>
			<div className="min-h-screen flex items-center justify-center  p-6">
				<div className='w-full max-w-lg mx-auto shadow-2xl rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 text-orange-50 p-6'>
					<div className="flex items-center justify-between mb-4">
						<h1 className='text-2xl font-semibold text-white'>Password Generator</h1>
						<div className="text-sm text-gray-300">{strength.label}</div>
					</div>

					<div className='flex items-center gap-3 mb-4'>
						<div className='flex-1 flex items-center bg-gray-900 rounded-md overflow-hidden'>
							<input
								type="text"
								value={password}
								className='outline-none w-full py-2 px-4 bg-transparent text-white placeholder-gray-400'
								placeholder='Generated password'
								readOnly
							/>
							<button
								title="Copy"
								className='px-3 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white'
								onClick={handleCopy}
							>
								{/* copy icon */}
								<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h8a1 1 0 011 1v12m-4 4H7a2 2 0 01-2-2V7a2 2 0 012-2h.5" />
								</svg>
							</button>
						</div>
						<button
							onClick={generatePassword}
							className='bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-md hover:from-orange-600 hover:to-pink-600 transition'
						>
							Generate
						</button>
					</div>

					{/* copied feedback */}
					{copied && <div className="text-sm text-emerald-400 mb-3">Copied to clipboard!</div>}

					<div className='mb-4'>
						<label className='block mb-2 text-sm text-gray-300'>Password Length: <span className='font-medium'>{length}</span></label>
						<div className='flex items-center gap-3'>
							<input
								type="range"
								min="4"
								max="32"
								value={length}
								onChange={(e) => setLength(Number(e.target.value))}
								className='w-full'
							/>
							<input
								type="number"
								className='w-14 bg-gray-900 text-white rounded px-2 py-1'
								min={4}
								max={32}
								value={length}
								onChange={(e) => setLength(Math.max(4, Math.min(32, Number(e.target.value) || 4)))}
							/>
						</div>
					</div>

					<div className='mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3'>
						<Toggle
							label='Select All'
							checked={allSelected}
							onChange={(v) => {
								setUppercaseAllowed(v)
								setLowercaseAllowed(v)
								setNumberAllowed(v)
								setSymbolAllowed(v)
							}}
						/>
						<Toggle label='Include Uppercase' checked={uppercaseAllowed} onChange={(v) => setUppercaseAllowed(v)} />
						<Toggle label='Include Lowercase' checked={lowercaseAllowed} onChange={(v) => setLowercaseAllowed(v)} />
						<Toggle label='Include Numbers' checked={numberAllowed} onChange={(v) => setNumberAllowed(v)} />
						<Toggle label='Include Symbols' checked={symbolAllowed} onChange={(v) => setSymbolAllowed(v)} />
					</div>

					{/* strength meter */}
					<div>
						<div className='w-full bg-gray-900 rounded h-3 overflow-hidden'>
							<div className={`h-3 ${strength.color}`} style={{ width: `${(strength.score / 4) * 100}%`, transition: 'width 200ms' }} />
						</div>
						<div className='text-xs text-gray-400 mt-2'>Strength: <span className='text-white'>{strength.label}</span></div>
					</div>
				</div>
			</div>
		</>
	)
}

export default App
