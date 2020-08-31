import React, { Component } from 'react';
import Player from '../components/audio components/Player';

export const TRACKS = [
  {
    title: 'Circles',
    artist: 'Post Malone',
    albumArtUrl: "https://images.genius.com/533e0052507f4191d9edff8e5dfeda19.1014x1014x1.jpg",
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/audio-and-video-player-cd0dc.appspot.com/o/Post%20Malone%20-%20Circles.mp3?alt=media&token=79ce3257-8837-40b9-9d94-fc906d9a82f4',
  },
  {
    title: 'Rockstar',
    artist: 'DaBaby Ft. Roddy Ricch',
    albumArtUrl: "https://headlineplanet.com/home/wp-content/uploads/2020/04/DaBaby-Blame-It-On-Baby-Cover-via-Interscope.jpg",
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/audio-and-video-player-cd0dc.appspot.com/o/DaBaby%20%E2%80%93%20ROCKSTAR%20FT%20RODDY%20RICCH%20%5BAudio%5D.mp3?alt=media&token=c39577e3-bf67-4f85-9c2e-e9fc9da356f7',
  },
  {
    title: 'Starboy',
    artist: 'The Weeknd',
    albumArtUrl: 'https://lastfm.freetls.fastly.net/i/u/770x0/dfd01019404313399f77999285f78aa9.jpg',
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/audio-and-video-player-cd0dc.appspot.com/o/The%20Weeknd%20-%20Starboy%20ft.%20Daft%20Punk%20(Official).mp3?alt=media&token=4df6d3ae-0793-4ebe-95c6-478250041c8e',
  },
  {
    title: 'In The End',
    artist: 'Linkin Park',
    albumArtUrl: 'https://m.media-amazon.com/images/I/818UOs3WGgL._SS500_.jpg',
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/audio-and-video-player-cd0dc.appspot.com/o/In%20the%20end%20-%20Linkin%20Park%20(with).mp3?alt=media&token=765ca193-9544-40a1-84a3-7e4e678779a1',
  },
  {
    title: 'Lucid Dreams',
    artist: 'Juice WRLD',
    albumArtUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cf/Juice_WRLD_-_Lucid_Dreams.png',
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/audio-and-video-player-cd0dc.appspot.com/o/Juice%20Wrld%20-%20Lucid%20Dreams.mp3?alt=media&token=86981122-e03d-4af9-8914-60ec179779f8',
  },
  {
    title: 'In My Feelings',
    artist: 'Drake',
    albumArtUrl: 'https://geo-media.beatport.com/image_size/300x300/a1003eb7-b933-4c28-b1eb-443be39d0334.jpg',
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/audio-and-video-player-cd0dc.appspot.com/o/Drake%20-%20In%20My%20Feelings%20kiki%20do%20you%20love%20me%20.mp3?alt=media&token=32249841-8a26-40b9-b618-49faa12e5ac1',
  },
  {
    title: 'Wake Me Up',
    artist: 'Avicii',
    albumArtUrl: 'https://m.media-amazon.com/images/I/613D3PpIiML._SS500_.jpg',
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/audio-and-video-player-cd0dc.appspot.com/o/Avicii%20-%20Wake%20Me%20Up.mp3?alt=media&token=52d2bb29-1775-4f53-a2d7-287cf59c0021',
  },
  {
    title: 'Wolves',
    artist: 'Selena Gomez, Marshmellow',
    albumArtUrl: 'https://www.directlyrics.com/img/upload/selena-gomez-marshmello-wolves.jpg',
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/audio-and-video-player-cd0dc.appspot.com/o/Wolves%20-%20Selena%20Gomez%2C%20Marshmello.mp3?alt=media&token=57f5ae28-59f5-4f26-b8e4-33ee68142403',
  },
];

export default class App extends Component {
  render() {
    return <Player tracks={TRACKS} />
  }
}
