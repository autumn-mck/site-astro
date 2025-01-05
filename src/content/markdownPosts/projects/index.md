---
title: Projects
description: A list of most of the projects I've worked on
noHeader: true
---

<style>
main {
  width: 140ch;
}

h2 {
  margin-top: 0rem;
}

li > p {
  margin: 0;
}

/* slide to the left */
.even {
  display: flex;
  flex-direction: row;
}

/* slide to the right */
.odd {
  display: flex;
  flex-direction: row-reverse;
}

/* criss cross */
@media screen and (max-width: calc(120ch + 2rem)) {
  .project {
    flex-direction: column;
    gap: 0;
  }
}

@media screen and (max-width: calc(140ch + 2rem)) {
  main {
    width: calc(100% - 4vw) !important;
    margin-left: 2vw;
    margin-right: 2vw;
  }
}
</style>

# Projects

I've made a whole bunch of projects for fun in the last few years, and have a few from university too. Here's a list of most of them!

<!-- nothing makes sense, so i might as well make nonsense -->

<div class="project odd">
  <div class="description">
    <h2 id="gnss-war-room">GNSS War Room</h2>

Work in progress - current final year project for my Computer Science degree, for displaying GNSS (Global Navigation Satellite System) data on a matrix of displays.

A snapshot of the current progress, with maps showing the locations of satellites, bar charts of signal to noise ratios, and other stats. Still a couple more months to go!

(The style and name are inspired by the 1983 film "WarGames", not any suggestion or desire for military use)

  </div>
  <div class="preview">

![Screenshot showing several windows, including a map of the earth with the locations of satellites overlayed, and other extracted statistics.](./imgs/gnss.png)

  </div>
</div>

<div class="project even">
  <div class="description">
    <h2 id="weird-fe">weird-fe</h2>

An experimental attempt to write my own frontend for [Akkoma](https://akkoma.social/) (and anything else supporting the [Mastodon API](https://docs.joinmastodon.org/))

Written partly to experiment with whatever ideas I found interesting at the time, meaning the frontend is served as a completely static site, and heavily uses [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) for rendering the UI. Written almost entirely from scratch to gain more experience working with a limited set of tools and see how things work as low a level is possible for a web app.

Supports:

- Viewing posts (with attatchments, content warnings, etc)
- Viewing replies to a post in a threaded view
- Viewing a user's posts, bio, etc.
- Viewing an instance's federated timeline
- Emoji reactions, including custom emojis
- Quote posts
- Akkoma's subset of [MFM](https://misskey-hub.net/en/docs/for-users/features/mfm/)

[weird-fe code](https://github.com/autumn-mck/weird-fe)

  </div>
<div class="preview">

![Screenshot of a thread of replies to a post](./imgs/weird-fe.png)

  </div>
</div>

<div class="project odd">
  <div class="description">
  <h2 id="musicdisplay">MusicDisplay</h2>

The widget on my site's homepage that displays the music I'm currently listening to, that I also wrote a [blog post](/blog/2024/small-projects-for-fun/) on. Has 4 parts:

- A MusicBee plugin written in C# to send the currently playing song to a server (Desktop)
- A Poweramp plugin/Android app to send the currently playing song to a server (Android)
- A server written in TypeScript with Bun to receive the currently playing song, and provide an API and/or websocket for the client (Server)
- A web component written with vanilla JS and CSS to display the currently playing song (Client)

  </div>
  <div class="preview less-wide">

  <music-display
        nowPlayingApi="https://music-display.mck.is/now-playing"
        websocketUrl="wss://music-display.mck.is/now-playing-ws">
  </music-display>

  <script src="https://music-display.mck.is/musicDisplayComponent.js" is:inline></script>

![Autumn's back again by northh](../blog/2024/small-projects-for-fun/autumns-back-again.png)

  </div>
</div>

<div class="project even">
  <div class="description">
  <h2 id="markov-fetch">Markov Fetch</h2>

A script to create a database of posts compatible with the [mstdn-ebooks](https://github.com/Lynnesbian/mstdn-ebooks) or [pleroma-ebooks](https://github.com/ioistired/pleroma-ebooks)-based [markov](https://en.wikipedia.org/wiki/Markov_chain) bots, that supports instances using secure/authorised fetch. Rather than using ActivityPub outboxes and pretending to be an instance, which [authorised fetch breaks](https://github.com/Lynnesbian/mstdn-ebooks/wiki/Secure-fetch), this script relies on the bot's instance's API to fetch copies of posts.

[Authorised-markov-fetch code](https://github.com/autumn-mck/authorised-markov-fetch)

  </div>
  <div class="preview">

![Screenshot of code](./imgs/markov.png)

  </div>
</div>

<div class="project odd">
  <div class="description">
  <h2 id="catppuccin-musicbee">Catppuccin MusicBee</h2>

A theme for the [MusicBee](https://www.getmusicbee.com/) music player based on the very nice [Catppuccin](https://github.com/catppuccin/catppuccin) colour palettes. The project of mine I use most regularly!

Uses a combination of `bash`, `imagemagick`, `xdotool`, `wine`, and `Xvfb` (X virtual framebuffer) to automate creating the 112 different variations of the theme for every combination of theme/accent colour.

[Catppuccin-MusicBee code and releases](https://github.com/catppuccin/musicbee)

  </div>
  <div class="preview">

![Screenshot of several versions of the theme, with a range of accent colours and background colours](./imgs/catppuccin-musicbee.webp)

  </div>
</div>

<div class="project even">
  <div class="description">
    <h2 id="planetphysics">PlanetPhysics</h2>

An [n-body](https://en.wikipedia.org/wiki/N-body_problem) planetary gravitational simulator built for fun as a side project.

Uses the less accurate [Euler method](https://en.wikipedia.org/wiki/Euler_method) for integration (this is mostly mitigated by using very small step sizes), but ideally in future it should use something like the Runge-kutta methods for better accuracy.

Includes several pre-set situations, including a fictional but nice-looking system (shown), a stable 3-body figure-8 system, a binary star system, and our solar system to scale (with and without moons)

[PlanetPhysics code](https://github.com/autumn-mck/PlanetPhysics)

  </div>
  <div class="preview">
    <video autoplay loop muted controls>
      <source src="/videos/solar_new.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</div>

<div class="project odd">
  <div class="description">
  <h2 id="driver">Driver</h2>

A from-scratch application with several parts:

- A 2D arcade-style driving simulation that feels fun to drive around in
- A system for creating and improving genetic neural networks written entirely from scratch to allow me to better understand how simple networks function, the maths behind them, and how they can perform surprisingly well!

The end result of which is networks which can drive a car pretty well based on only a handful of sensors (5 distances to the edge of the track at different angles by default)

[Driver code](https://github.com/autumn-mck/MonoGameDriver)

  </div>
  <div class="preview mid-wide">

![Video showing several hundred cars driving around the 2d track, with some colliding into the edges and stopping](./imgs/driver.gif)

  </div>
</div>

<div class="project even">
  <div class="description">
  <h2 id="driver">WOPR</h2>

A web app to generate an SVG with the given text using the HP1345A's font, hosted at <https://wopr.mck.is/>.

Most of the credit goes to Poul-Henning Kamp for [reverse engineering the HP1345A's character generator](https://phk.freebsd.dk/hacks/Wargames/) - I've just strapped it to a web app to make it easier to use for simple use-cases.

Source code not currently available, as it's related to my final year project, and I need to check that won't cause any issues.

  </div>
  <div class="preview">

![A strange game. The only winning move is not to play. How about a nice game of chess?](./imgs/wopr.png)

  </div>
</div>

<div class="project odd">
  <div class="description">
  <h2 id="rtweekend">RTWeekend</h2>

Multithreaded CPU raytracer written in C#. Based on the "Ray Tracing in One Weekend" book. Features:

- Reflections (inc. reflections of reflections) - Refraction (e.g. light passing through glass spheres)
- Accurate shadows
- Depth of field
- Multithreaded for significantly increaded performance

Although performance could significantly be improved by running the processing on the GPU, it was still a very fun project!

[Raytracer code](https://github.com/autumn-mck/RTWeekend)

  </div>
  <div class="preview">

![Example output of the program, showing spheres of different sizes and different materials](./imgs/rtWeekend.webp)

  </div>
</div>

<div class="project even">
  <div class="description">
  <h2 id="website">Personal website</h2>

The website you're currently browsing! Built using [Astro](https://astro.build/), which I'm using as a static site generator to combine my typescript, markdown, and vanilla CSS into a working site!

Made to be as lightweight as possible, with the main page being only 40kb, images and everything, having both an FCP and LCP of 0.3s.

You can [read why I picked Astro](/blog/2024/new-site), or [look at how this site has changed over time](/changelog)!

[Website code](https://github.com/autumn-mck/site-astro)

  </div>
  <div class="preview">

![A screenshot of the home page of this website](./imgs/website.avif)

  </div>
</div>

<div class="project odd">
  <div class="description">
  <h2 id="the-last-stand">The Last Stand</h2>

A text adventure made as a group project for our "Web Technologies" (CSC1030) module.

I designed and wrote the majority of the CSS for the layout, along with the temperature and typewriter systems used by all other group members. I also worked with them to create the inventory and timer systems also used throughout the game.

We worked great as a group, and stuck together for several group projects after this one.

[Last Stand Code](https://github.com/autumn-mck/LastStand), or [play The Last Stand here](https://last-stand.mck.is/)!

  </div>
  <div class="preview">

![A game in-progess, showing the player several choices for how to proceed, and an image of where they are](./imgs/last-stand.webp)

  </div>
</div>

<div class="project even">
  <div class="description">
  <h2 id="powdertoy">SandSim</h2>

A small particle/powder toy simulator. Very basic - its flaws are definitely noticable if you're looking for them, however it's still a lot of fun to mess around with, seeing how much just a few simple rules can create!

Will likely return to this one in the future to improve and expand on it, and see how I can increase performance.

[PowderSim code](https://github.com/autumn-mck/ParticleSim)

  </div>
  <div class="preview">
    <video autoplay loop muted controls>
      <source src="/videos/powdertoy.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</div>

<div class="project odd">
  <div class="description">
  <h2 id="musicbee-install">MusicBee install script</h2>

A script to automate setting up [MusicBee](https://getmusicbee.com/) (A Windows application) on linux. I wrote a whole [blog post](/blog/2024/musicbee-on-linux/) on this!

- Automatically sets up a wineprefix with the required libraries
- Downloads and installs the specified version of MusicBee
- Creates an improved XDG Desktop entry
- Installs Discordbee and Wine-Discord IPC bridge to allow the song you're currently listening to to be displayed as a status

[MusicBee install script here](https://gist.github.com/autumn-mck/6d7fcbbc08f5d18be09f2cc219084675)

  </div>
  <div class="preview">

![Screenshot of MusicBee running on linux](./imgs/musicbee-linux.avif)

  </div>
</div>

<div class="project even">
  <div class="description">
  <h2 id="a2-project">A2 Project</h2>

This application was my A2 coursework project for Software Systems Development, written between 10/11/2020 and 14/03/2021 using
C# and WPF. See the [git repo](https://github.com/autumn-mck/A2-Project) for more details and features

This is still a project I'm very proud of - It's got a few minor flaws, but it has some features I put a lot of work into and
I'm very happy with the end result.

[A2 Project Code](https://github.com/autumn-mck/A2-Project)

  </div>
  <div class="preview">

![Some graphs in the statistics view](./imgs/a2-stats.webp)

  </div>
</div>

<div class="project odd">
  <div class="description">
  <h2 id="csc1028">CSC1028</h2>

My project for the "Compute Science Challenges" (CSC1028) module I opted to do at university, providing all sorts of metadata on a given URL.
See my [blog post for CSC1028](/CSC1028/) for a lot more info.

[CSC1028 code](https://github.com/autumn-mck/CSC1028APIs)

  </div>
  <div class="preview less-wide">

![UI showing several data sources, including a SimilarWeb rank, DNS lookup, phishing/malware data, earliest archive date, and all subdomains](./imgs/1028.png)

  </div>
</div>

<div class="project even">
  <div class="description">
    <h2>git-music-log</h2>

A project written as a joke to see if it was possible to store a record of what music you're listening to as a list of git commits. Why? Because what's more commonly used for storing changes over time than version control software like git? (Databases, but that's not as funny)

It seemingly is possible! And you shouldn't do it, because again, databases exist.

[git-music-log code](https://github.com/autumn-mck/git-music-log)

  </div>

  <div class="preview">

![A log of some music tracks being played](imgs/music-log.png)

  </div>
</div>

## WebGenJava

The program I wrote to convert markdown to HTML for a previous version of this website. Although there are already existing solutions that
offer this sort of functionality (eg [pandoc](https://pandoc.org/)), I wanted something that gave me slightly more
control over the result.

[WebGenJava code](https://github.com/autumn-mck/WebGenJava) (Please, don't use it)
