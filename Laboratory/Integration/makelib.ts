import { type Library, Instrument, Album, Song, StudioAlbum, LiveAlbum, Musician } from "./schema";

export function makelib(): Library {
    return {
        albums: new Map([
            ["Giant Steps", Album.fromStudioAlbum({
                tracks: [
                    {
                        title: "Giant Steps",
                        year: 1959,
                        performers: [{
                            name: "John Coltrane",
                            plays: Instrument.Piano,
                            id: "ff990458-a276-4b71-b2e3-57d49470b949"
                        }],
                    },
                    {
                        title: "A Night in Tunisia",
                        year: 1942,
                        performers: [
                            {
                                name: "Dizzy Gillespie",
                                plays: Instrument.Trumpet,
                                id: "84f4b320-0f1e-463e-982c-78772fabd74d"
                            },
                            {
                                name: "Count Basie",
                                plays: Instrument.Piano,
                                id: "b28d54d6-a3f7-48bf-a07a-117c15cf33ef"
                            },
                        ]
                    },
                    {
                        title: "Groovin' High"
                    }
                ]
            })],
            ["Adam's Apple", Album.fromLiveAlbum({
                venueName: "Tunisia",
                concertDate: new Date(528205479000)
            })],
            ["Milestones", Album.fromStudioAlbum({
                tracks: []
            })],
            ["Brilliant Corners", Album.fromLiveAlbum({
                venueName: "Night's Palace",
                tracks: [
                    {
                        year: 1965,
                        performers: [
                            {
                                name: "Carmell Jones",
                                plays: Instrument.Trumpet,
                                id: "f7c31724-0387-4ac9-b6f0-361bb9415c1b"
                            },
                            {
                                name: "Joe Henderson",
                                plays: Instrument.Sax,
                                id: "bb4facf3-c65a-46dd-a96f-73ca6d1cf3f6"
                            },
                            {
                                name: "Teddy Smith",
                                plays: Instrument.Clarinet,
                                id: "91ffb47f-2a38-4876-8186-1f267cc21706"
                            }
                        ]
                    }
                ]
            })],
        ])
    };
}