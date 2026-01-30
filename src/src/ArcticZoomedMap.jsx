import React, { useState } from 'react';
import { Thermometer, AlertCircle, MapPin, Navigation, Snowflake, Wind, Waves, TrendingUp, X } from 'lucide-react';

export default function ArcticZoomedMap() {
  const [hoveredPort, setHoveredPort] = useState(null);
  const [selectedPort, setSelectedPort] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [showRoutes, setShowRoutes] = useState(true);

  // Seoul baseline temperature for comparison
  const seoulTemp = -2; // °C (28°F)

  // NSR Port data (Russia/Norway) - 2026.01.31 data
  const nsrPorts = [
    { 
      id: 'murmansk', 
      name: '무르만스크', 
      nameEn: 'Murmansk', 
      lat: 68.9585, 
      lon: 33.0827, 
      temp: -3, 
      normal: -12.5,
      deviation: 9.5, 
      color: 'yellow', 
      country: '🇷🇺', 
      region: 'NSR' 
    },
    { 
      id: 'arkhangelsk', 
      name: '아르한겔스크', 
      nameEn: 'Arkhangelsk', 
      lat: 64.5401, 
      lon: 40.5433, 
      temp: -2, 
      normal: -10,
      deviation: 8.0, 
      color: 'yellow', 
      country: '🇷🇺', 
      region: 'NSR' 
    },
    { 
      id: 'sabetta', 
      name: '사베타', 
      nameEn: 'Sabetta', 
      lat: 71.2819, 
      lon: 72.0467, 
      temp: 3, 
      normal: -22.5,
      deviation: 25.5, 
      color: 'red', 
      highlight: true, 
      country: '🇷🇺', 
      region: 'NSR' 
    },
    { 
      id: 'dikson', 
      name: '딕슨', 
      nameEn: 'Dikson', 
      lat: 73.5069, 
      lon: 80.4003, 
      temp: -18, 
      normal: -28.5,
      deviation: 10.5, 
      color: 'orange', 
      country: '🇷🇺', 
      region: 'NSR' 
    },
    { 
      id: 'dudinka', 
      name: '두딘카', 
      nameEn: 'Dudinka', 
      lat: 69.4058, 
      lon: 86.1775, 
      temp: -15, 
      normal: -22.5,
      deviation: 7.5, 
      color: 'yellow', 
      country: '🇷🇺', 
      region: 'NSR' 
    },
    { 
      id: 'khatanga', 
      name: '하탄가', 
      nameEn: 'Khatanga', 
      lat: 71.9781, 
      lon: 102.4708, 
      temp: -20, 
      normal: -30,
      deviation: 10.0, 
      color: 'orange', 
      country: '🇷🇺', 
      region: 'NSR' 
    },
    { 
      id: 'tiksi', 
      name: '틱시', 
      nameEn: 'Tiksi', 
      lat: 71.6408, 
      lon: 128.8664, 
      temp: -17, 
      normal: -26.5,
      deviation: 9.5, 
      color: 'yellow', 
      country: '🇷🇺', 
      region: 'NSR' 
    },
    { 
      id: 'pevek', 
      name: '페베크', 
      nameEn: 'Pevek', 
      lat: 69.7011, 
      lon: 170.3133, 
      temp: -14, 
      normal: -25,
      deviation: 11.0, 
      color: 'orange', 
      country: '🇷🇺', 
      region: 'NSR' 
    },
    { 
      id: 'tromso', 
      name: '트롬쇠', 
      nameEn: 'Tromsø', 
      lat: 69.6492, 
      lon: 18.9553, 
      temp: -2, 
      normal: -8.5,
      deviation: 6.5, 
      color: 'yellow', 
      country: '🇳🇴', 
      region: 'NSR' 
    },
    { 
      id: 'kirkenes', 
      name: '키르케네스', 
      nameEn: 'Kirkenes', 
      lat: 69.7264, 
      lon: 30.0458, 
      temp: -3, 
      normal: -10,
      deviation: 7.0, 
      color: 'yellow', 
      country: '🇳🇴', 
      region: 'NSR' 
    },
    { 
      id: 'longyearbyen', 
      name: '롱이어비엔', 
      nameEn: 'Longyearbyen', 
      lat: 78.2232, 
      lon: 15.6267, 
      temp: -10, 
      normal: -17.5,
      deviation: 7.5, 
      color: 'yellow', 
      country: '🇳🇴', 
      region: 'NSR' 
    },
  ];

  // NWR Port data (Canada/USA/Denmark) - 2026.01.31 data
  const nwrPorts = [
    { 
      id: 'iqaluit', 
      name: '이칼루이트', 
      nameEn: 'Iqaluit', 
      lat: 63.7467, 
      lon: -68.5170, 
      temp: -18, 
      normal: -28,
      deviation: 10.0, 
      color: 'orange', 
      country: '🇨🇦', 
      region: 'NWR' 
    },
    { 
      id: 'resolute', 
      name: '레졸루트', 
      nameEn: 'Resolute', 
      lat: 74.6956, 
      lon: -94.8292, 
      temp: -30, 
      normal: -35,
      deviation: 5.0, 
      color: 'yellow', 
      country: '🇨🇦', 
      region: 'NWR' 
    },
    { 
      id: 'cambridge', 
      name: '케임브리지베이', 
      nameEn: 'Cambridge Bay', 
      lat: 69.1181, 
      lon: -105.0528, 
      temp: -28, 
      normal: -33.5,
      deviation: 5.5, 
      color: 'yellow', 
      country: '🇨🇦', 
      region: 'NWR' 
    },
    { 
      id: 'pond', 
      name: '폰드인렛', 
      nameEn: 'Pond Inlet', 
      lat: 72.6989, 
      lon: -77.9625, 
      temp: -25, 
      normal: -31.5,
      deviation: 6.5, 
      color: 'yellow', 
      country: '🇨🇦', 
      region: 'NWR' 
    },
    { 
      id: 'utqiagvik', 
      name: '우트키아그비크', 
      nameEn: 'Utqiaġvik', 
      lat: 71.2906, 
      lon: -156.7886, 
      temp: 2, 
      normal: -26.5,
      deviation: 28.5, 
      color: 'red', 
      highlight: true, 
      country: '🇺🇸', 
      region: 'NWR' 
    },
    { 
      id: 'nome', 
      name: '놈', 
      nameEn: 'Nome', 
      lat: 64.5011, 
      lon: -165.4064, 
      temp: -10, 
      normal: -18,
      deviation: 8.0, 
      color: 'yellow', 
      country: '🇺🇸', 
      region: 'NWR' 
    },
    { 
      id: 'prudhoe', 
      name: '프루도베이', 
      nameEn: 'Prudhoe Bay', 
      lat: 70.2553, 
      lon: -148.3372, 
      temp: -20, 
      normal: -30,
      deviation: 10.0, 
      color: 'orange', 
      country: '🇺🇸', 
      region: 'NWR' 
    },
    { 
      id: 'nuuk', 
      name: '누크', 
      nameEn: 'Nuuk', 
      lat: 64.1814, 
      lon: -51.6941, 
      temp: -8, 
      normal: -13,
      deviation: 5.0, 
      color: 'yellow', 
      country: '🇬🇱', 
      region: 'NWR' 
    },
    { 
      id: 'ilulissat', 
      name: '일룰리사트', 
      nameEn: 'Ilulissat', 
      lat: 69.2198, 
      lon: -51.0986, 
      temp: -14, 
      normal: -19,
      deviation: 5.0, 
      color: 'yellow', 
      country: '🇬🇱', 
      region: 'NWR' 
    },
    { 
      id: 'qaanaaq', 
      name: '카낙', 
      nameEn: 'Qaanaaq', 
      lat: 77.4840, 
      lon: -69.3632, 
      temp: -27, 
      normal: -33.5,
      deviation: 6.5, 
      color: 'yellow', 
      country: '🇬🇱', 
      region: 'NWR' 
    },
  ];

  const allPorts = [...nsrPorts, ...nwrPorts];

  // Helper functions - ZOOMED for 60°N to North Pole
  const toFahrenheit = (celsius) => ((celsius * 9/5) + 32).toFixed(1);

  const projectPoint = (lat, lon, centerLat = 90, centerLon = 0, rotationAngle = 0) => {
    // INCREASED SCALE for zoom: 60°N to 90°N only
    const width = 900;
    const height = 900;
    const scale = 750; // Increased from 360 to 750 for 2x zoom
    
    const adjustedLon = lon + rotationAngle;
    const lambda = (adjustedLon - centerLon) * Math.PI / 180;
    const phi = lat * Math.PI / 180;
    const phi0 = centerLat * Math.PI / 180;
    
    const cosc = Math.sin(phi0) * Math.sin(phi) + Math.cos(phi0) * Math.cos(phi) * Math.cos(lambda);
    
    // Still show points even if slightly out of visible hemisphere
    const x = width / 2 + scale * Math.cos(phi) * Math.sin(lambda);
    const y = height / 2 - scale * (Math.cos(phi0) * Math.sin(phi) - Math.sin(phi0) * Math.cos(phi) * Math.cos(lambda));
    
    return { x, y, visible: true };
  };

  const getColor = (colorName) => {
    const colors = {
      red: '#dc2626',
      orange: '#f97316',
      yellow: '#eab308',
      blue: '#3b82f6'
    };
    return colors[colorName] || colors.blue;
  };

  const getBgColor = (colorName) => {
    const bgColors = {
      red: 'bg-red-600 hover:bg-red-700',
      orange: 'bg-orange-500 hover:bg-orange-600',
      yellow: 'bg-yellow-500 hover:bg-yellow-600',
      blue: 'bg-blue-500 hover:bg-blue-600'
    };
    return bgColors[colorName] || bgColors.blue;
  };

  const drawRoute = (points, color, rotationAngle = 0) => {
    if (points.length < 2) return '';
    
    let path = '';
    let firstPoint = true;
    
    for (let i = 0; i < points.length - 1; i++) {
      const start = projectPoint(points[i].lat, points[i].lon, 90, 0, rotationAngle);
      const end = projectPoint(points[i + 1].lat, points[i + 1].lon, 90, 0, rotationAngle);
      
      if (!start || !end) continue;
      
      if (firstPoint) {
        path += `M ${start.x} ${start.y}`;
        firstPoint = false;
      }
      path += ` L ${end.x} ${end.y}`;
    }
    
    return path;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-950 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Snowflake className="w-12 h-12 text-blue-300 animate-spin" style={{ animationDuration: '20s' }} />
            <h1 className="text-6xl font-black text-white">
              북극의 날씨 - 2026.01.31 (토요일)
            </h1>
            <Snowflake className="w-12 h-12 text-blue-300 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div className="text-3xl text-red-300 font-bold mb-2">
            60°N ~ 북극점 확대 지도 (도시명 가독성 향상)
          </div>
          <div className="text-2xl text-blue-200">
            NSR/NWR 주요 항만 온도 편차 지도
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 border-4 border-yellow-400 rounded-2xl p-5 mb-6 shadow-2xl">
          <div className="flex items-center justify-center gap-4">
            <AlertCircle className="w-10 h-10 text-yellow-300 animate-pulse" />
            <div className="text-white text-xl font-black">
              🔴 극한 온난화 경보: 사베타(러시아) +3°C (평년 대비 +25.5°C) | 우트키아그비크(미국) +2°C (평년 대비 +28.5°C)
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-300 animate-pulse" />
          </div>
        </div>

        {/* Legend */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 border-2 border-blue-400/50 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Thermometer className="w-7 h-7 text-blue-400" />
            온도 편차 범례 (평년 대비 현재 기온 차이)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 bg-red-900/30 rounded-xl p-3 border border-red-500/50">
              <div className="w-8 h-8 rounded-full bg-red-600 border-3 border-white shadow-lg flex items-center justify-center text-white font-bold">R</div>
              <div className="text-white">
                <div className="font-bold text-lg">극한 온난화 🔥</div>
                <div className="text-sm text-red-200">+20°C 이상</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-orange-900/30 rounded-xl p-3 border border-orange-500/50">
              <div className="w-8 h-8 rounded-full bg-orange-500 border-3 border-white shadow-lg flex items-center justify-center text-white font-bold">O</div>
              <div className="text-white">
                <div className="font-bold text-lg">높은 편차 ⚠️</div>
                <div className="text-sm text-orange-200">+10~20°C</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-yellow-900/30 rounded-xl p-3 border border-yellow-500/50">
              <div className="w-8 h-8 rounded-full bg-yellow-500 border-3 border-white shadow-lg flex items-center justify-center text-white font-bold">Y</div>
              <div className="text-white">
                <div className="font-bold text-lg">중간 편차 ⚡</div>
                <div className="text-sm text-yellow-200">+5~10°C</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-blue-900/30 rounded-xl p-3 border border-blue-500/50">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-3 border-white shadow-lg flex items-center justify-center text-white font-bold">B</div>
              <div className="text-white">
                <div className="font-bold text-lg">정상 범위 ❄️</div>
                <div className="text-sm text-blue-200">+5°C 미만</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Zoomed Arctic Map (60°N to North Pole) */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-indigo-900/80 backdrop-blur-lg rounded-3xl p-10 border-4 border-blue-400/40 relative shadow-2xl">
          
          {/* Controls */}
          <div className="absolute top-6 right-6 bg-slate-800/90 rounded-xl p-4 border border-blue-400/50 z-10">
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input 
                type="checkbox" 
                checked={showRoutes}
                onChange={(e) => setShowRoutes(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-bold">항로 표시</span>
            </label>
          </div>

          <svg width="900" height="900" viewBox="0 0 900 900" className="mx-auto drop-shadow-2xl">
            <defs>
              <radialGradient id="arcticOcean" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#0369a1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
              </radialGradient>
              
              <radialGradient id="iceGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0" />
              </radialGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="strongGlow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background - zoomed to show 60°N to 90°N */}
            <circle cx="450" cy="450" r="400" fill="url(#arcticOcean)" />
            <circle cx="450" cy="450" r="380" fill="url(#iceGradient)" />
            
            {/* Polar grid - meridians */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => {
              const rad = angle * Math.PI / 180;
              const x = 450 + 390 * Math.cos(rad - Math.PI / 2);
              const y = 450 + 390 * Math.sin(rad - Math.PI / 2);
              return (
                <g key={`meridian-${angle}`}>
                  <line x1="450" y1="450" x2={x} y2={y} stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="8,8" />
                  <text x={450 + 405 * Math.cos(rad - Math.PI / 2)} y={450 + 405 * Math.sin(rad - Math.PI / 2)} fontSize="14" fill="#94a3b8" textAnchor="middle" fontWeight="bold">{angle}°</text>
                </g>
              );
            })}

            {/* Parallel circles - 60°N, 70°N, 80°N (zoomed scale) */}
            {[60, 70, 80].map(lat => {
              const scale = 750; // Zoomed scale
              const r = scale * Math.cos(lat * Math.PI / 180);
              return (
                <g key={`parallel-${lat}`}>
                  <circle cx="450" cy="450" r={r} fill="none" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.4" strokeDasharray="6,6" />
                  <text x="450" y={450 - r - 8} fontSize="16" fill="#cbd5e1" textAnchor="middle" fontWeight="bold">{lat}°N</text>
                </g>
              );
            })}

            {/* Routes */}
            {showRoutes && (
              <>
                <path d={drawRoute(nsrPorts, 'red', rotation)} fill="none" stroke="#dc2626" strokeWidth="5" strokeDasharray="15,15" strokeOpacity="0.8" filter="url(#glow)" strokeLinecap="round" />
                <path d={drawRoute(nwrPorts, 'blue', rotation)} fill="none" stroke="#3b82f6" strokeWidth="5" strokeDasharray="15,15" strokeOpacity="0.8" filter="url(#glow)" strokeLinecap="round" />
              </>
            )}

            {/* Port markers - LARGER TEXT for readability */}
            {allPorts.map(port => {
              const projected = projectPoint(port.lat, port.lon, 90, 0, rotation);
              if (!projected) return null;
              
              const { x, y } = projected;
              const color = getColor(port.color);
              const isHovered = hoveredPort?.id === port.id;
              const size = isHovered ? 18 : (port.highlight ? 16 : 14); // Larger markers
              
              return (
                <g key={port.id}>
                  {port.highlight && (
                    <>
                      <circle cx={x} cy={y} r="35" fill={color} opacity="0.2" className="animate-ping" />
                      <circle cx={x} cy={y} r="28" fill={color} opacity="0.3" className="animate-pulse" />
                    </>
                  )}
                  
                  <circle cx={x} cy={y} r={size + 5} fill={color} opacity="0.4" filter="url(#glow)" />
                  <circle cx={x} cy={y} r={size} fill={color} stroke="white" strokeWidth="4" filter={port.highlight ? "url(#strongGlow)" : "url(#glow)"} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={() => setHoveredPort(port)} onMouseLeave={() => setHoveredPort(null)} onClick={() => setSelectedPort(port)} />
                  
                  {/* Country flag - larger */}
                  <text x={x} y={y + 6} fontSize="16" textAnchor="middle">{port.country}</text>
                  
                  {port.highlight && (
                    <text x={x} y={y - 30} fontSize="32" textAnchor="middle" className="animate-bounce">🔥</text>
                  )}
                  
                  {/* Port name - MUCH LARGER for readability */}
                  <text x={x} y={y + (port.highlight ? 50 : 38)} fontSize="18" fontWeight="bold" textAnchor="middle" fill="white" stroke="#000" strokeWidth="5" paintOrder="stroke">{port.name}</text>
                  <text x={x} y={y + (port.highlight ? 68 : 56)} fontSize="14" textAnchor="middle" fill="#e2e8f0" stroke="#000" strokeWidth="4" paintOrder="stroke">{port.nameEn}</text>
                  <text x={x} y={y + (port.highlight ? 86 : 74)} fontSize="16" fontWeight="bold" textAnchor="middle" fill={color} stroke="#000" strokeWidth="4" paintOrder="stroke">{port.temp}°C</text>
                </g>
              );
            })}

            {/* North Pole - larger */}
            <g>
              <circle cx="450" cy="450" r="14" fill="#fbbf24" stroke="white" strokeWidth="4" filter="url(#glow)" />
              <text x="450" y="428" fontSize="20" fontWeight="bold" textAnchor="middle" fill="white" stroke="#000" strokeWidth="4" paintOrder="stroke">🧭</text>
              <text x="450" y="410" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#fbbf24" stroke="#000" strokeWidth="4" paintOrder="stroke">North Pole</text>
              <text x="450" y="392" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#fbbf24" stroke="#000" strokeWidth="3" paintOrder="stroke">90°N</text>
            </g>
          </svg>

          {/* Hover tooltip */}
          {hoveredPort && (
            <div className="absolute top-20 left-8 bg-gradient-to-br from-slate-800 to-slate-900 border-3 border-blue-400 rounded-2xl p-5 shadow-2xl max-w-sm z-20">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  <div className="text-xl font-black">{hoveredPort.country} {hoveredPort.name}</div>
                </div>
                <div className="text-sm text-gray-300 mb-3">{hoveredPort.nameEn}</div>
                
                <div className="space-y-2 bg-slate-950/50 rounded-xl p-3 border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">현재 기온:</span>
                    <span className="font-black text-2xl" style={{ color: getColor(hoveredPort.color) }}>{hoveredPort.temp}°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">평년 대비:</span>
                    <span className="font-bold text-xl text-red-400">+{hoveredPort.deviation.toFixed(1)}°C ⬆️</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">위도:</span>
                    <span className="font-bold text-lg text-blue-300">{hoveredPort.lat.toFixed(2)}°N</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Port Selection Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* NSR Section */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border-2 border-red-400/50">
            <h3 className="text-3xl font-bold text-red-300 mb-6 flex items-center gap-3">
              <Navigation className="w-8 h-8" />
              NSR 도시/항만 (북동항로)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {nsrPorts.map(port => (
                <button
                  key={port.id}
                  onClick={() => setSelectedPort(port)}
                  className={`p-4 rounded-lg text-white font-bold transition-all transform hover:scale-105 ${getBgColor(port.color)} shadow-lg`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">{port.name}</div>
                    <div className="text-2xl">{port.temp}°C</div>
                    {port.highlight && <div className="text-2xl mt-1">🔥</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* NWR Section */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border-2 border-blue-400/50">
            <h3 className="text-3xl font-bold text-blue-300 mb-6 flex items-center gap-3">
              <Navigation className="w-8 h-8" />
              NWR 도시/항만 (북서항로)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {nwrPorts.map(port => (
                <button
                  key={port.id}
                  onClick={() => setSelectedPort(port)}
                  className={`p-4 rounded-lg text-white font-bold transition-all transform hover:scale-105 ${getBgColor(port.color)} shadow-lg`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">{port.name}</div>
                    <div className="text-2xl">{port.temp}°C</div>
                    {port.highlight && <div className="text-2xl mt-1">🔥</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center space-y-3 text-sm text-gray-400">
          <div className="text-base text-blue-300 font-bold">
            데이터 출처: Roshydromet.ru, Yr.no, Weather.gc.ca, Weather.gov, Dmi.dk, TimeAndDate.com, AccuWeather
          </div>
          <div className="text-yellow-300 font-bold text-lg">
            ⚠️ 지도 범위: 60°N ~ 90°N (북극점) 확대 표시 - 항만/도시명 가독성 향상
          </div>
          <div>지도 투영: 정사영(Orthographic Projection) - 북극 중심 뷰 (90°N), 확대 배율 2배</div>
          <div>업데이트: 2026년 1월 31일 (토) KST 오후 5:19 PM</div>
          <div className="text-blue-400 font-bold text-base pt-2">
            제작: 북극경제신문 손경령(Sonia Son) | 사용자: Yangsan, Gyeongsangnam-do, KR
          </div>
        </div>
      </div>

      {/* Port Detail Modal */}
      {selectedPort && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-8"
          onClick={() => setSelectedPort(null)}
        >
          <div 
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-2xl w-full text-white border-4 border-blue-400 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6 border-b border-blue-700 pb-4">
              <div>
                <h3 className="text-4xl font-black mb-2">
                  {selectedPort.country} {selectedPort.name}
                </h3>
                <div className="text-xl text-gray-300">{selectedPort.nameEn}</div>
                <div className="text-sm text-gray-400 mt-2">
                  위치: {selectedPort.lat.toFixed(2)}°N, {Math.abs(selectedPort.lon).toFixed(2)}°{selectedPort.lon > 0 ? 'E' : 'W'}
                </div>
              </div>
              <button
                onClick={() => setSelectedPort(null)}
                className="bg-red-600 hover:bg-red-700 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Temperature Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Thermometer className="w-6 h-6" />
                  <span className="text-sm text-blue-100">현재 온도</span>
                </div>
                <div className="text-5xl font-black mb-2">{selectedPort.temp}°C</div>
                <div className="text-2xl text-blue-200">{toFahrenheit(selectedPort.temp)}°F</div>
              </div>

              <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Thermometer className="w-6 h-6" />
                  <span className="text-sm text-gray-100">평년 기온</span>
                </div>
                <div className="text-5xl font-black mb-2">{selectedPort.normal}°C</div>
                <div className="text-2xl text-gray-200">{toFahrenheit(selectedPort.normal)}°F</div>
              </div>
            </div>

            {/* Deviation Alert */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-7 h-7" />
                <span className="text-xl font-bold">온도 편차 (평년 기온 대비 오늘 차이)</span>
              </div>
              <div className="text-5xl font-black">+{selectedPort.deviation.toFixed(1)}°C ⬆️</div>
              <div className="text-xl mt-2">+{(selectedPort.deviation * 1.8).toFixed(1)}°F 상승</div>
            </div>

            {/* Impact Info */}
            {selectedPort.highlight && (
              <div className="bg-red-900/50 border-2 border-red-500 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-300 font-bold mb-2">
                  <AlertCircle className="w-6 h-6" />
                  극한 온난화 경보 지역
                </div>
                <div className="text-sm text-gray-200">
                  이 항만은 평년 대비 +20°C 이상의 극심한 온도 상승을 기록하고 있습니다. 
                  북극 해빙 가속화 및 해양 생태계에 심각한 영향이 예상됩니다.
                </div>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => setSelectedPort(null)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
