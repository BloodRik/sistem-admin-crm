'use client'

import React, { useState, useEffect, useRef } from 'react'

const WorkerComponent = () => {
	const [phoneNumbers, setPhoneNumbers] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [copied, setCopied] = useState(false)
	const [inputNumber, setInputNumber] = useState()
	const fetchedRef = useRef(false)

	useEffect(() => {
		const fetchPhoneNumbers = async () => {
			try {
				const response = await fetch('/api/getPhoneNumbers')
				const data = await response.json()
				setPhoneNumbers(data.phoneNumbers)
			} catch (error) {
				console.error('Error fetching phone numbers:', error)
			}
		}

		if (!fetchedRef.current) {
			fetchPhoneNumbers()
			fetchedRef.current = true
		}
	}, [])

	const nextFile20Numbers = async () => {
		setCurrentIndex(0)
		const response = await fetch('/api/getPhoneNumbers')
		const data = await response.json()
		setPhoneNumbers(data.phoneNumbers)
		setCopied(false)
	}

	const handleNextNumber = async () => {
		if (currentIndex + 1 < phoneNumbers.length) {
			setCurrentIndex(prevIndex => prevIndex + 1)
		} else {
			try {
				const response = await fetch('/api/getPhoneNumbers')
				const data = await response.json()
				setPhoneNumbers(data.phoneNumbers)
				setCurrentIndex(0)
			} catch (error) {
				console.error('Error fetching phone numbers:', error)
			}
		}
		setCopied(false)
	}

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text)
			console.log('Text copied to clipboard:', text)
			setCopied(true)
			setTimeout(() => {
				console.log('Resetting copied state')
				setCopied(false)
			}, 2000)
		} catch (error) {
			console.error('Error copying text to clipboard:', error)
		}
	}

	const OpenWhatsappApp = () => {
		window.location.href = `whatsapp://send/?phone=${phoneNumbers[currentIndex]}`
		console.log(phoneNumbers[currentIndex])
	}

	const inputOpenWhatsappApp = () => {
		window.location.href = `whatsapp://send/?phone=${phoneNumbers[currentIndex]}`
		setInputNumber
	}

	useEffect(() => {
		console.log('Copied state changed:', copied)
	}, [copied])

	return (
		<div className='relative min-h-screen'>
			<video
				autoPlay
				loop
				muted
				className='absolute top-0 left-0 w-full h-full object-cover'
			>
				<source src='/emploeeBG1.mp4' type='video/mp4' />
				Your browser does not support the video tag.
			</video>
			<div className='relative z-10 flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50 p-4'>
				{phoneNumbers.length > 0 ? (
					<div>
						<p
							style={{
								color: copied ? 'green' : 'white',
								fontSize: '70px',
								textAlign: 'center',
								marginBottom: '80px',
							}}
							onClick={() => copyToClipboard(phoneNumbers[currentIndex])}
						>
							{phoneNumbers[currentIndex]}
						</p>

						<div className='flex justify-center'>
							<button
								className='text-green-400 bg-neutral-300 bg-opacity-45 border-2 rounded-xl border-white px-4 py-2 w-[130px] hover:bg-green-400 hover:text-white hover:border-red-800 mr-[80px]'
								onClick={OpenWhatsappApp}
							>
								Вызов Whatsapp
							</button>
							<button
								className='text-blue-400 bg-neutral-300 bg-opacity-45 border-2 rounded-xl border-white px-4 py-2 w-[130px] hover:bg-red-300 hover:text-black hover:border-red-800'
								onClick={handleNextNumber}
							>
								Следующий номер
							</button>
						</div>
					</div>
				) : (
					<p>Загрузка номеров...</p>
				)}
				<div className='flex flex-col sm:flex-row justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4'>
					<button
						className='text-stone-950 bg-neutral-300 bg-opacity-45 border-2 border-white px-4 py-2 w-[130px] rounded-xl hover:bg-red-800 hover:text-white hover:border-blue-500'
						onClick={nextFile20Numbers}
					>
						След. База
					</button>
				</div>
				<div className='flex flex-col sm:flex-row justify-center items-center mt-12 space-y-4 sm:space-y-0 sm:space-x-4'>
					<input
						type='number'
						id='first_name'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[240px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center'
						placeholder='Whatsapp call'
						required
						onChange={inputNumber}
					/>
					<button
						className='text-white bg-neutral-300 bg-opacity-45 border-2 rounded-xl border-white px-4 py-2 w-[150px] h-[40px] hover:bg-purple-500 hover:text-green-300 hover:border-yellow-400'
						onClick={inputOpenWhatsappApp}
					>
						Call Whatsapp
					</button>
				</div>
			</div>
		</div>
	)
}

export default WorkerComponent
