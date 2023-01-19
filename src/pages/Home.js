import searchIcon from '../assets/icons/search.svg';
import { anron } from '../data/anron';
import { feather } from '../data/feather';
import { social } from '../data/social';
import { firefly } from '../data/firefly';

import '../assets/styles/header.css';
import '../assets/styles/search.css';
import '../assets/styles/icons.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [selectedSet, setSelectedSet] = useState(feather);
  const [oldIcons, setOldIcons] = useState(selectedSet);
  const [newIcons, setNewIcons] = useState(selectedSet);
  const [categories, setCategories] = useState(
    oldIcons
      .map((icon) => {
        return icon.category;
      })
      .filter((value, index, self) => self.indexOf(value) === index)
  );
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const filteredIcons = oldIcons.filter((icon) => {
      return icon.title.includes(searchValue);
    });
    setNewIcons(filteredIcons);
  }, [searchValue]);

  useEffect(() => {
    setCategories(
      newIcons
        .map((icon) => {
          return icon.category;
        })
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  }, [oldIcons]);

  function download(iconTitle) {
    const svg = document.querySelector(`#icon-${iconTitle}`);
    const base64doc = btoa(unescape(encodeURIComponent(svg.innerHTML)));
    const a = document.createElement('a');
    const e = new MouseEvent('click');
    a.download = `${iconTitle}.svg`;
    a.href = 'data:image/svg+xml;base64,' + base64doc;
    a.dispatchEvent(e);
  }

  function filterIcon(iconCategory) {
    const fIcons = oldIcons.filter((icon) => {
      return icon.category === iconCategory;
    });
    setNewIcons(fIcons);
  }

  return (
    <div>
      <div className='header'>
        <div style={{ color: '#777' }}>
          Made with ❤ by{' '}
          <a
            href='https://codebyosama.com'
            style={{ textDecoration: 'none', color: '#048484' }}
          >
            codebyosama.com
          </a>
        </div>
        <div className='logo' onClick={() => setSearchValue('')}>
          <svg
            width='105'
            height='32'
            viewBox='0 0 105 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_1_2)'>
              <path d='M105 0H73V32H105V0Z' fill='#333333' />
              <path
                d='M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16Z'
                fill='#333333'
              />
              <path d='M51.5 0L70.1195 31.5H32.8805L51.5 0Z' fill='#333333' />
            </g>
            <defs>
              <clipPath id='clip0_1_2'>
                <rect width='105' height='32' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div
          className='credits'
          onClick={() => {
            window.open('https://codebyosama.com/contact');
          }}
        >
          Need a website? Hire me
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M9 4.75C8.58579 4.75 8.25 4.41421 8.25 4C8.25 3.58579 8.58579 3.25 9 3.25H20C20.4142 3.25 20.75 3.58579 20.75 4V15C20.75 15.4142 20.4142 15.75 20 15.75C19.5858 15.75 19.25 15.4142 19.25 15V5.81066L4.53033 20.5303C4.23744 20.8232 3.76256 20.8232 3.46967 20.5303C3.17678 20.2374 3.17678 19.7626 3.46967 19.4697L18.1893 4.75H9Z'
              fill='#22272F'
            />
          </svg>
        </div>
      </div>
      {/* Search Field Starts */}
      <div className='search'>
        <div className='search-field'>
          <input
            id='search-input'
            placeholder='Search icons'
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          ></input>
          <img src={searchIcon} id='search-icon' />
          <select
            className='search-select'
            onChange={(e) => {
              if (e.target.value === 'feather') {
                setNewIcons(feather);
                setOldIcons(feather);
              } else if (e.target.value === 'social') {
                setNewIcons(social);
                setOldIcons(social);
              } else if (e.target.value === 'firefly') {
                setNewIcons(firefly);
                setOldIcons(firefly);
              } else if (e.target.value === 'anron') {
                setNewIcons(anron);
                setOldIcons(anron);
              }
            }}
          >
            <option value='feather'>Feather</option>
            <option value='firefly'>Firefly</option>
            <option value='social'>Social</option>
            <option value='anron'>Anron</option>
          </select>
        </div>
      </div>
      {/* Search Field Ends */}
      <div id='icons'>
        <div id='icons-filters'>
          <div className='icons-filter' onClick={() => setNewIcons(oldIcons)}>
            All
          </div>
          {categories.map((filter) => {
            return (
              <div className='icons-filter' onClick={() => filterIcon(filter)}>
                {filter}
              </div>
            );
          })}
        </div>
        <div id='icons-images'>
          {newIcons.map((icon) => {
            return (
              <div className='icon'>
                <div class='icon-download' onClick={() => download(icon.title)}>
                  <svg
                    width='12'
                    height='14'
                    viewBox='0 0 12 14'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6 1V13M6 13L11 8M6 13L1 8'
                      stroke='#22272F'
                      stroke-width='1.5'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
                <div
                  class='icon-copy'
                  id={icon.title}
                  onClick={() => {
                    navigator.clipboard.writeText(icon.svg);
                    document.getElementById(icon.title).innerHTML = 'Copied!';
                    setTimeout(() => {
                      document.getElementById(icon.title).innerHTML = `<svg
                    width='17'
                    height='16'
                    viewBox='0 0 17 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      x='1.5'
                      y='1'
                      width='9.8'
                      height='9.8'
                      rx='2.8'
                      stroke='#22272F'
                      stroke-width='1.61538'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M11.4167 5.20001V5.20001C12.6119 5.20001 13.2095 5.20001 13.6863 5.37948C14.441 5.6635 15.0365 6.25907 15.3205 7.01371C15.5 7.49053 15.5 8.08814 15.5 9.28335V10.52C15.5 12.0882 15.5 12.8722 15.1948 13.4712C14.9264 13.998 14.498 14.4264 13.9712 14.6948C13.3722 15 12.5882 15 11.02 15H9.78335C8.58814 15 7.99053 15 7.51371 14.8205C6.75907 14.5365 6.1635 13.941 5.87948 13.1863C5.70001 12.7095 5.70001 12.1119 5.70001 10.9167V10.9167'
                      stroke='#22272F'
                      stroke-width='1.61538'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>`;
                    }, 500);
                  }}
                >
                  <svg
                    width='17'
                    height='16'
                    viewBox='0 0 17 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      x='1.5'
                      y='1'
                      width='9.8'
                      height='9.8'
                      rx='2.8'
                      stroke='#22272F'
                      stroke-width='1.61538'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M11.4167 5.20001V5.20001C12.6119 5.20001 13.2095 5.20001 13.6863 5.37948C14.441 5.6635 15.0365 6.25907 15.3205 7.01371C15.5 7.49053 15.5 8.08814 15.5 9.28335V10.52C15.5 12.0882 15.5 12.8722 15.1948 13.4712C14.9264 13.998 14.498 14.4264 13.9712 14.6948C13.3722 15 12.5882 15 11.02 15H9.78335C8.58814 15 7.99053 15 7.51371 14.8205C6.75907 14.5365 6.1635 13.941 5.87948 13.1863C5.70001 12.7095 5.70001 12.1119 5.70001 10.9167V10.9167'
                      stroke='#22272F'
                      stroke-width='1.61538'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
                <div className='icon-svg'>
                  <span
                    id={`icon-${icon.title}`}
                    dangerouslySetInnerHTML={{ __html: icon.svg }}
                  />
                </div>
                <div className='icon-title'>{icon.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
