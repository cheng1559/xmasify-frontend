type Song = {
    title: string;
    src: string;
    artist: string;
};

export const songs: Song[] = [
    { title: 'All I Want For Christmas Is You', artist: 'Mariah Carey', src: '/music/All I Want For Christmas Is You.mp3' },
    { title: 'Feliz Navidad', artist: 'Walk Off the Earth', src: '/music/Feliz Navidad.mp3' },
    { title: 'Hallelujah', artist: 'Pentatonix', src: '/music/Hallelujah.mp3' },
    { title: 'Last Christmas', artist: 'Wham!', src: '/music/Last Christmas.mp3' },
    { title: 'O Christmas Tree', artist: 'Barbie', src: '/music/O Christmas Tree.mp3' }
];


songs.sort(() => Math.random() - 0.5);