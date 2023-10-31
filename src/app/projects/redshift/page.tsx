"use client";

import { motion } from "framer-motion";

const pageAnim = {
  exit: { x: "100vw", opacity: 0, transition: { duration: 0.6 } },
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delayChildren: 0.6,
      staggerChildren: 0.6,
    },
  },
};

const textAnimItem = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const Redshift = () => {
  return (
    <div className="flex container justify-center my-24">
      <div className="max-w-2xl space-y-5 md:space-y-8">
        <motion.div exit="exit" initial="initial" animate="animate">
          <motion.div variants={textAnimItem}>
            <img src="/projects/redshift/Redshift_Logo.png" alt="" />
          </motion.div>
          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-3"
          >
            <h2 className="text-2xl font-bold md:text-3xl">Redshift FPS</h2>
            <p className="text-lg">
              I founded Redshift after falling in love with a few other games in
              the genre. Quake Live, Unreal Tournament and Uberstrike all
              influenced the GDD in some way or other.
            </p>
            <p className="text-lg">
              Redshift is a re-imagined arena-shooter that lets you choose the
              pace you want to play! It revitalises the genre by introducing
              unique design and new intuitive weapons. Redshift has a fun
              levelling system, competitive ladders, tons of skinned items, and
              an active, caring development team!
            </p>
          </motion.div>
          <motion.div variants={textAnimItem} className="space-y-3">
            <h2 className="text-2xl font-bold md:text-3xl">
              Realtime friends, messaging and lobby
            </h2>
            <p className="text-lg">
              Among other things, I took on the responsibility of creating the
              back-end for the game. This included a user system based around
              JWT with role based access to API endpoints. This allows game
              administrators to ban, mute and kick players easily via a web
              based administration panel. The friend system allows users to
              add/remove friends and communicate in real time. It also relays
              user status allowing friends to join their current game. All this
              can be seen in the video below.
            </p>
          </motion.div>
          <motion.div variants={textAnimItem} className="space-y-3">
            <h2 className="text-2xl font-bold md:text-3xl">
              Game Network Logic
            </h2>
            <p className="text-lg">
              The games network architecture is based around a
              semi-authorititive approach. Weapon rate of fire checks and player
              stats are all done on the server. This is of course not as
              effective as a fully authorititive approach though for the sake of
              practicality (COST) it works quite well. Other anti-cheat measures
              are also in place client-side.
            </p>
          </motion.div>
          <motion.div variants={textAnimItem} className="space-y-3">
            <h2 className="text-2xl font-bold md:text-3xl">Game Mechanics</h2>
            <p className="text-lg">
              The strafing mechanic also known as bunnyhopping is adopted by
              games such as Quake, CSGO and Unreal tournament. An example
              approach is as shown here, (
              <a href="http://adrianb.io/2015/02/14/bunnyhop.html">
                {"Bunnyhopping from the Programmer's Perspective"}
              </a>
              ). It should be noted that the issue with other arena shooters is
              that strafing can become very difficult to learn for new players.
              My aim was to eliminate this learning curve and make it simple,
              yet with the ability for players to master. I developed a
              character controller that implements this strafing mechanic, and
              have recently re-worked it to support a more server authorititve
              approach.
            </p>
            <p className="text-lg">
              The in-game shop allows users to purchase new weapons and update
              their loadouts. A player can equip a total of three weapons,
              excluding the default melee. These are machine gun, shotgun and
              sniper. A player cannot equip more than one class of weapon. The
              shop automatically pulls in data from the CMS (Prismic). This
              allows us to quickly add new weapons to the shop when they are
              ready.
            </p>
          </motion.div>
          <div>
            {/*  <ReactPlayer*/}
            {/*    url="https://youtu.be/RZodemetqLg"*/}
            {/*    width={"100%"}*/}
            {/*    height={"100%"}*/}
            {/*    className={classes.player}*/}
            {/*  />*/}
            <div>
              <img src="/projects/redshift/NorthEarth_Logo.png" alt="" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Redshift;
