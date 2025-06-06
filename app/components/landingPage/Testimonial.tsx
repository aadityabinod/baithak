import { SVGProps } from "react";

export function Testimonial() {
  return (
    <>
      <div className="relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Blockquote */}
        <blockquote className="text-center lg:mx-auto lg:w-3/5">
          <YouTube className="mx-auto w-20 h-auto sm:w-28 dark:invert" />

          <div className="">
            <p className="relative text-xl sm:text-2xl md:text-3xl md:leading-normal font-medium">
            
                
              <span className="relative z-10">
                Wow, Welcome to Baithak- give it a try!
              </span>
            </p>
          </div>
          <footer className="mt-6">
            <div className="font-semibold">Aaditya B</div>
            <div className="text-sm text-muted-foreground">
              Developer 
            </div>
          </footer>
        </blockquote>
        {/* End Blockquote */}
      </div>
    </>
  );
}

const YouTube = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="409.289 277.787 512 114.301"
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* YouTube logo SVG content remains unchanged */}
    {/* ... */}
  </svg>
);
