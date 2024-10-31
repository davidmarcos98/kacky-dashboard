'use client'
import { Snippet, Code } from "@nextui-org/react";

export default function About() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 h-full w-[100%] lg:px-[25%] 2xl:px-[30%] px-20" style={{ paddingBottom: "80px" }}>
      <div className="grid grid-columns-1 gap-4 w-[100%]">
        <h2 className="text-2xl font-bold text-center" style={{ marginTop: "15px" }}>About</h2>
        <h4>
          This website doesn't use any cookies at all, and no personally identifiable information is retrieved or stored. Anonymized analytics information (device OS, browser, country of origin) is sent <b>only</b> to a self-hosted server for traffic analytics purposes.
          &nbsp;
          <a
            href="https://umami.is/docs/faq"
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
              More info
          </a>
        </h4>

        <h4>
          Twitch embed is used to display clips on the website, and Twitch's privacy policy applies. Some cookies may be used by Twitch itself.
        </h4>
        <h4>
          This website is made by just myself on my free time, so any feedback or bug reports are welcome. You can reach me on discord (<a href="https://discordapp.com/users/298826431889145857" target="_blank" className="font-bold underline">@socramdavid</a>).
        </h4>
        <h4>
          This was highly inspired by <a href="https://kacky.wingobear.com" target="_blank" className="font-bold underline">kacky.wingobear.com</a>, please check it out! Thanks to chico and areyeses for their help with some of the code owo
        </h4>

        <h2 className="text-2xl font-bold text-center">How to use</h2>
        <h4>
          If you want to use this website for your own stream and have your own finishes page (like <a href="https://kacky.socr.am/dashboard/maps/david" target="_blank" className="underline">https://kacky.socr.am/dashboard/maps/david</a>), 
          send me a message on discord (<a href="https://discordapp.com/users/298826431889145857" target="_blank" className="font-bold">@socramdavid</a>) to setup your user.
        </h4>
        <h4>
          Non-manual setup is not possible for now. You will receive a user and password with instructions on how to submit clips for your new finishes.
        </h4>

        <h2 className="text-2xl font-bold text-center">Chat commands</h2>
        <div className="flex justify-center" style={{ marginTop: "-10px", alignSelf: "center", alignItems: "center"}}>
          <Code color='danger' className="font-bold">Nightbot/Fossabot</Code>
          &nbsp;
          <Code color='success' className="font-bold">Streamelements</Code>
        </div>
        <h4>
          You can use these commands to show your latest finish, the number of finishes you have, and to get a clip for a specific
        </h4>
        <h3 className="font-extrabold">1. Get a clip for a specific map</h3>
        <h2 className="italic" style={{ marginTop: "-10px"}}>Usage: !clip 349 - returns clip for map 349, if exists</h2>
        <Snippet color='danger' symbol="#" className="w-fit command">!addcom !clip $(customapi https://kacky.socr.am/api/twitch/clip/$(1))</Snippet>
        <Snippet color='success' symbol="#" className="w-fit command">!command add !clip $(customapi.https://kacky.socr.am/api/twitch/clip/$(1))</Snippet>
        <h3 className="font-extrabold">2. Get last finish for user</h3>
        <h2 style={{ marginTop: "-10px"}}>⚠️&nbsp; Replace {'<USER>'} with the username used in the dashboard url</h2>
        <Snippet color='danger' symbol="#" className="w-fit command">{'!addcom !lastfin $(customapi https://kacky.socr.am/api/twitch/lastFinish/<USER>)'}</Snippet>
        <Snippet color='success' symbol="#" className="w-fit command">{'!command add !lastfin $(customapi.https://kacky.socr.am/api/twitch/lastFinish/<USER>)'}</Snippet>
        <h3 className="font-extrabold">3. Get number of finishes for user</h3>
        <h2 style={{ marginTop: "-10px"}}>⚠️&nbsp; Replace {'<USER>'} with the username used in the dashboard url</h2>
        <Snippet color='danger' symbol="#" className="w-fit command">{'!addcom !fins $(customapi https://kacky.socr.am/api/twitch/finishes/<USER>)'}</Snippet>
        <Snippet color='success' symbol="#" className="w-fit command">{'!command !fins $(customapi.https://kacky.socr.am/api/twitch/finishes/<USER>)'}</Snippet>
        <h3 className="font-extrabold">4. Add clip from chat ⚠️ FOSSABOT ONLY ⚠️</h3>
        <h2 className="italic" style={{ marginTop: "-10px"}}>Usage: !addfin map_name clip_url - submits finish clip for the given map</h2>
        <h2 className="font-extrabold" style={{ marginTop: "-10px"}}>⚠️&nbsp; Make sure to make this command moderator only!</h2>
        <h2 style={{ marginTop: "-10px"}}>This will send the request to add the clip to your dashboard and automatically match your twitch username to your dashboard's username</h2>
        <Snippet color='danger' symbol="#" className="w-fit command">{'!addcom !addfin $(customapi https://kacky.socr.am/api/twitch/addFinish?map=$(1)&clip=$(2))'}</Snippet>
      </div>
    </section>
  );
}
