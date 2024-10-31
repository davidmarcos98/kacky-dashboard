"use client"
import {Snippet} from "@nextui-org/snippet";

export default function SnippetComp({isMobile}: {isMobile: boolean}) {

    return (
        <>
            {!isMobile ? 
                <div className="flex flex-col items-center w-full">
                    <Snippet
                        className="w-[fit] font-bold"
                        variant="bordered"
                        color="danger"
                        hideCopyButton={true}
                        symbol=""
                    >
                        ⚠︎ Contact @socramdavid on discord if you want to add your own clips
                    </Snippet>
                </div> :
                <></>
            }
        </>
  );
}