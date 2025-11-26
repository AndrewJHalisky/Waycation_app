export type Showtime = {
    id: string;
    time: string;
    venue: string;
}

export type Event = {
    id: string;
    title: string;
    description: string;
    date: string;
    showtimes: Showtime[];
}
export type RootStackParamList = {
  EventList: undefined;
  EventDetail: { event: Event };
};
