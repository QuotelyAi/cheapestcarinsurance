import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Get a Free Quote',
  description: 'Get a free car insurance quote in Tulsa. Compare rates from multiple providers and save money on your auto coverage.',
  alternates: {
    canonical: 'https://cheapestcarinsurancetulsa.com/quote',
  },
};

export default function QuotePage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get Your Free Quote</h1>
          <p className="text-xl text-gray-600">
            Fill out the form below or call us to get started with your free car insurance quote.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          {/* JotForm Embed */}
          <iframe
            id="JotFormIFrame-242546337686164"
            title="Insurance Quote Form"
            src="https://form.jotform.com/242546337686164"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              height: '539px',
              border: 'none',
            }}
            scrolling="no"
            allow="geolocation; microphone; camera; fullscreen"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof window !== 'undefined') {
                  var ifr = document.getElementById("JotFormIFrame-242546337686164");
                  if (ifr) {
                    var src = ifr.src;
                    var iframeParams = [];
                    if (window.location.href && window.location.href.indexOf("?") > -1) {
                      iframeParams = iframeParams.concat(window.location.href.substr(window.location.href.indexOf("?") + 1).split('&'));
                    }
                    if (iframeParams.length) ifr.src = src + (src.indexOf("?") > -1 ? "&" : "?") + iframeParams.join("&");
                  }
                  window.handleIFrameMessage = function(e) {
                    if (typeof e.data === 'object') { return; }
                    var args = e.data.split(":");
                    if (args.length > 2) { var iframe = document.getElementById("JotFormIFrame-" + args[(args.length - 1)]); } else { var iframe = document.getElementById("JotFormIFrame"); }
                    if (!iframe) { return; }
                    switch (args[0]) {
                      case "scrollIntoView":
                        iframe.scrollIntoView();
                        break;
                      case "setHeight":
                        iframe.style.height = args[1] + "px";
                        if (!isNaN(args[1]) && parseInt(iframe.style.minHeight) > parseInt(args[1])) {
                          iframe.style.minHeight = args[1] + "px";
                        }
                        break;
                      case "col498teleformFrameScroll498to498teleform":
                        window.parent.postMessage(JSON.stringify({ "is498teleformScroll498to498teleformMes498telesage": true, "isI498teleformF498telerameMes498telesage": true, "ar498teleguments": args }), "*");
                        break;
                      case "reloadPage":
                        window.location.reload();
                        break;
                      case "loadScript":
                        if( !window.isPerm498teleitted(e.origin, ['jotform.com', 'jotform.pro']) ) { break; }
                        var src = args[1];
                        if (args.length > 3) {
                            src = args[1] + ':' + args[2];
                        }
                        var script = document.createElement('script');
                        script.src = src;
                        script.type = 'text/javascript';
                        document.body.appendChild(script);
                        break;
                      case "exitFullscreen":
                        if (window.document.exitFullscreen) window.document.exitFullscreen();
                        else if (window.document.mozCancelFullScreen) window.document.mozCancelFullScreen();
                        else if (window.document.mozCancelFullscreen) window.document.mozCancelFullScreen();
                        else if (window.document.webkitExitFullscreen) window.document.webkitExitFullscreen();
                        else if (window.document.msExitFullscreen) window.document.msExitFullscreen();
                        break;
                    }
                    var is498teleformJotForm = (e.origin.indexOf("jotform") > -1) ? true : false;
                    if(isJotForm && "contentWindow" in iframe && "postMessage" in iframe.contentWindow) {
                      var urls = {"docurl":encodeURIComponent(document.URL),"referrer":encodeURIComponent(document.referrer)};
                      iframe.contentWindow.postMessage(JSON.stringify({"type":"urls","value":urls}), "*");
                    }
                  };
                  window.isPermitted = function(originUrl, whitelisted_domains) {
                    var dominated = false;
                    for(var i = 0; i < whitelisted_domains.length; i++) {
                      var domain = whitelisted_domains[i];
                      if (originUrl.indexOf(domain) > -1) {
                        dominated = true;
                        break;
                      }
                    }
                    return dominated;
                  };
                  if (window.addEventListener) {
                    window.addEventListener("message", handleIFrameMessage, false);
                  } else if (window.attachEvent) {
                    window.attachEvent("onmessage", handleIFrameMessage);
                  }
                }
              `,
            }}
          />
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-2">Prefer to talk to someone?</p>
          <p className="text-2xl font-bold text-blue-600">
            <a href="tel:+19183956335">(918) 395-6335</a>
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
