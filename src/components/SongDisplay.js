import React, { useEffect, useState } from 'react';
import axios from 'axios';


console.log(process.env.REACT_APP_backendURL, "test");


const SongDisplay = ({ onSongSelect, selectedSong, currentPage, songsPerPage, displayAll }) => {
    const [allSongs, setAllSongs] = useState([]);
    const [currentSongImage, setCurrentSongImage] = useState(null);
    const [currentSongTitle, setCurrentSongTitle] = useState('');

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(`https://api.samplesearcher.ca/audio_tracks`);
                console.log('API Response:', response.data); // Log the API response

                const songsWithBase64Images = response.data.map((song) => {
                    if (song.cover_art) {
                        return { ...song};
                    } else {
                        console.error('Invalid cover data for song:', song);
                        return { ...song, cover_art: '' }; // Handle missing cover data
                    }
                });

                // Shuffle the songs array randomly
                const shuffledSongs = shuffleArray(songsWithBase64Images);
                setAllSongs(shuffledSongs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSongs();
    }, []);

    useEffect(() => {
        if (selectedSong) {
            setCurrentSongImage(selectedSong.cover_art);
            setCurrentSongTitle(selectedSong.name);
        } else {
            setCurrentSongImage(null);
            setCurrentSongTitle('');
        }
    }, [selectedSong]);

    const startIndex = (currentPage - 1) * songsPerPage;
    let songsToDisplay = displayAll ? allSongs : allSongs; // No filtering for favorites

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            {currentSongImage && (
                <div style={{
                    position: 'fixed',
                    bottom: '95px',  // Adjust this value to ensure it sits just above the song player
                    left: '15px',  // Position it on the left side of the page
                    backgroundColor: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                    width: '330px',
                    overflow: 'hidden',
                    zIndex: 1000 // Ensure it stays above other elements
                }}>
                    <img src={currentSongImage} alt={currentSongTitle} style={{
                        width: '310px',
                        height: '300px',
                        borderRadius: '10px'
                    }} />
                    <h3 style={{
                        textAlign: 'center',
                        paddingTop: '20px',
                        color: 'black',
                        fontSize: '22px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>{currentSongTitle}</h3>
                </div>
            )}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginLeft: selectedSong ? '370px' : '0',
                transition: 'margin-left 1.5s',
                paddingBottom: '100px' // Adjust this value to ensure there's space for the fixed elements
            }}>
                {songsToDisplay.slice(startIndex, startIndex + songsPerPage).map((song) => (
                    <div
                        key={song.id}
                        style={{ width: '150px', margin: '10px', cursor: 'pointer' }}
                        onClick={() => onSongSelect(song)}
                    >
                        {song.cover_art ? (
                            <img src={song.cover_art} alt={song.name} style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                borderRadius: '10px'
                            }} />
                        ) : (
                            <div style={{
                                width: '150px',
                                height: '150px',
                                backgroundColor: 'black',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px'
                            }}>
                                No Image
                            </div>
                        )}
                        <h2 style={{
                            fontSize: '16px',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginTop: '5px',
                            border: '0px solid #ddd',
                            padding: '5px',
                            borderRadius: '5px',
                            color: 'white'
                        }}>
                            {song.name}
                        </h2>
                    </div>
                ))}
            </div>
            <div id="song-player" style={{
                position: 'fixed',
                bottom: '0',
                left: '0', // Align it to the left of the page
                width: '100%', // or any specific width
                zIndex: 1000,
                // Add any other styles for your song player here
            }}>
                {/* Your song player component goes here */}
            </div>
        </div>
    );
};

// Utility function to shuffle array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export default SongDisplay;
