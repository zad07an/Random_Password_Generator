import React, { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { FiCheckSquare } from 'react-icons/fi';
import './App.css'

function App() {
  const [password, setPassword] = useState({
    length: 6,
    lowerCase: true,
    upperCase: false,
    numbers: false,
    symbols: false
  });
  const [pwd, setPwd] = useState('lQNq4M');
  const [copied, setCopied] = useState(false);

  const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const handlePwdLength = (e) => {
    setPassword({
      ...password,
      length: e.target.value
    })
  }

  const handlePwdLower = () => {
    setPassword({
      ...password,
      lowerCase: !password.lowerCase
    })
  }

  const handlePwdUpper = () => {
    setPassword({
      ...password,
      upperCase: !password.upperCase
    })
  }

  const handlePwdNumbers = () => {
    setPassword({
      ...password,
      numbers: !password.numbers
    })
  }

  const handlePwdSybmols = () => {
    setPassword({
      ...password,
      symbols: !password.symbols
    })
  }

  const handleCopyPwd = () => {
    if (pwd.length > 0) {
      navigator.clipboard.writeText(pwd)
      setCopied(true);
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }


  function generateWord(passWord) {
    const { length, lowerCase, upperCase, numbers, symbols } = passWord;
    const availableCharacters = [
      ...(lowerCase ? lowerCaseLetters : []),
      ...(upperCase ? upperCaseLetters : []),
      ...(numbers ? numbersArray : []),
      ...(symbols ? symbolsArray : [])
    ];
    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
    const characters = shuffleArray(availableCharacters).slice(0, length);
    setPwd(characters.join(''))
    return characters;
  }

  const qualityLineColor = { width: password.length <= 0 ? '0%' : password.length <= 8 ? '33%' : password.length <= 16 ? '66%' : '100%', background: password.length <= 0 ? 'red' : password.length <= 8 ? 'red' : password.length <= 16 ? 'goldenrod' : 'greenyellow' }
  const qualityLineInfo = password.length <= 0 ? 'Empty' : password.length <= 8 ? 'Weak' : password.length <= 16 ? 'Medium' : 'Strong'

  return (
    <div className="App">
      {/* App header */}
      <div className="generator_app">
        <div className="app_header">
          <input type="text" value={pwd} readOnly />
          <button onClick={handleCopyPwd}>{copied ? <FiCheckSquare/> : <BiCopy/>}</button>
        </div>
        {/* Quality box */}
        <div className='quality_box'>
          <div className='quality_bar'>
            <div className='quality_line' style={qualityLineColor}></div>
          </div>
          <div className='quality_text'>
            <p style={{color: qualityLineInfo === 'Empty' && 'red'}}>{qualityLineInfo} Password</p>
          </div>
        </div>
        {/* Settings title */}
        <div className='settings_title'>
          <p>Password Settings</p>
        </div>
        {/* Range of password length */}
        <div className='range_box'>
          <div className='range_info'>
            <p>Password Length:</p>
            <p>{password.length}</p>
          </div>
          <input type="range" max={32} value={password.length} onChange={handlePwdLength} />
        </div>
        {/* Settings */}
        <div className="app_settings">
          <div className='lower_case'>
            <input type="checkbox" checked={password.lowerCase} onChange={handlePwdLower} id='lower' />
            <label htmlFor="lower">Lowercase (abc)</label>
          </div>
          <div className='upper_case'>
            <input type="checkbox" checked={password.upperCase} onChange={handlePwdUpper} id='upper' />
            <label htmlFor="upper">Uppercase (ABC)</label>
          </div>
          <div className='numbers'>
            <input type="checkbox" checked={password.numbers} onChange={handlePwdNumbers} id='numbers' />
            <label htmlFor="numbers">Numbers (123)</label>
          </div>
          <div className='symbols'>
            <input type="checkbox" checked={password.symbols} onChange={handlePwdSybmols} id='symbols' />
            <label htmlFor="symbols">Symbols (#$%)</label>
          </div>
        </div>
        <div className="generate_box">
          <button onClick={() => generateWord(password)}>Generate</button>
        </div>
      </div>
    </div>
  )
}

export default App
