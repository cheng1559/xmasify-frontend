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
    { title: 'O Christmas Tree', artist: 'Barbie', src: '/music/O Christmas Tree.mp3' },
    { title: '첫 눈', artist: 'EXO', src: '/music/첫 눈.mp3' },
    { title: 'Jingle Bells', artist: 'Children\'s Christmas Favorites', src: '/music/Jingle Bells.mp3' },
    { title: 'Twelve Days of Christmas', artist: 'Various Artists', src: '/music/Twelve Days of Christmas.mp3' },
    { title: '圣诞结', artist: '陈奕迅', src: '/music/圣诞结.mp3' },
    { title: '圣诞星 (feat. 杨瑞代)', artist: '周杰伦', src: '/music/圣诞星 (feat_ 杨瑞代).mp3' },
];


songs.sort(() => Math.random() - 0.5);