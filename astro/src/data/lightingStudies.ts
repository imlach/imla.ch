import whiteHaze from "../assets/live/white-haze.webp";
import crossedBeams from "../assets/live/crossed-beams.webp";
import amberStage from "../assets/live/amber-stage.webp";
import warmCrowd from "../assets/live/warm-crowd.webp";
import blueRoom from "../assets/live/blue-room.webp";
import atTheDesk from "../assets/live/at-the-desk.webp";

// Descriptive working names; project and photographer credits are still to be added.
export const lightingStudies = [
  { id: "warm-crowd", name: "Warm crowd", image: warmCrowd, position: "50% 55%", alt: "An audience silhouetted against warm orange haze and a bright fan of light.", note: "Opening image. Warmth, silhouettes and a sense of being in the room.", landscape: true },
  { id: "blue-room", name: "Blue room", image: blueRoom, position: "50% 60%", alt: "An audience beneath violet beams and a blue wash, with branches silhouetted on the rear wall.", note: "Film/live pairing. Colour and atmosphere with room for a quiet title.", landscape: true },
  { id: "white-haze", name: "White haze", image: whiteHaze, position: "50% 65%", alt: "A dark room with audience silhouettes and horizontal white beams through haze.", note: "A quieter opening. Negative space and anticipation.", landscape: false },
  { id: "crossed-beams", name: "Crossed beams", image: crossedBeams, position: "50% 68%", alt: "A performer framed by crossing white beams, with the audience in silhouette below.", note: "Personal index. A graphic composition that holds its shape vertically.", landscape: false },
  { id: "amber-stage", name: "Amber stage", image: amberStage, position: "50% 68%", alt: "A band performing under white spotlights and an amber wash, seen from the audience.", note: "A project opener. The relationship between lighting and performers is clear.", landscape: false },
  { id: "at-the-desk", name: "At the desk", image: atTheDesk, position: "50% 40%", alt: "A mixing desk in the foreground, with musicians under purple and amber lights on stage.", note: "Behind the work. A useful bridge into process notes and the technical notebook.", landscape: false },
];
