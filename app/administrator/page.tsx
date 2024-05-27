'use client';

import React, { useState } from 'react';

const AdminComponent: React.FC = () => {
  const [csvDataCount, setCsvDataCount] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async e => {
        if (e.target) {
          const content = e.target.result as string;
          const lines = content.split('\n').filter(line => line.trim() !== '').map(line => line.trim());
          try {
            const response = await fetch('/api/uploadPhoneNumbers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ phoneNumbers: lines }),
            });
            if (response.ok) {
              await fetchPhoneNumberCount(); // Обновляем количество номеров после загрузки
            } else {
              throw new Error('Failed to upload phone numbers');
            }
          } catch (error) {
            console.error(error);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const fetchPhoneNumberCount = async () => {
    try {
      const response = await fetch('/api/getPhoneNumberCount');
      const data = await response.json();
      setCsvDataCount(data.count);
    } catch (error) {
      console.error('Error fetching phone number count:', error);
    }
  };

  const deleteAllPhoneNumbers = async () => {
    try {
      const response = await fetch('/api/deleteAllPhoneNumbers', {
        method: 'DELETE',
      });
      if (response.ok) {
        setCsvDataCount(0); // Обнуляем количество номеров после удаления
      } else {
        throw new Error('Failed to delete phone numbers');
      }
    } catch (error) {
      console.error('Error deleting phone numbers:', error);
    }
  };

  return (
    <div className="relative min-h-screen">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50 p-4">
        <h1 className="text-gray-400 text-center mt-12 xl:text-8xl lg:text-4xl md:text-3xl sm:text-2xl">
          Админ
        </h1>
        <div className="flex flex-col sm:flex-row justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="file"
            accept=".csv"
            className="w-64 h-10 sm:w-64 sm:h-10 mr-2"
            onChange={handleFileChange}
          />
          <button
            className="h-10 w-24 border text-center bg-gray-700 text-white"
            onClick={fetchPhoneNumberCount}
          >
            Обновить
          </button>
        </div>
        <div className="">
          <h2 className="text-center mt-12 text-2xl sm:text-3xl md:text-4xl text-white">
            Количество номеров в базе: {csvDataCount}
          </h2>
          <button
            className='text-blue-400 bg-neutral-300 bg-opacity-45 border-2 rounded-xl border-white px-4 py-2 w-full hover:bg-red-300 hover:text-black hover:border-red-800 mt-5'
            onClick={deleteAllPhoneNumbers}
          >
            Удалить всю базу
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminComponent;