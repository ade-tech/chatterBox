import ProfileImage from "./Profile";

/**
 * OnBoardingSide component for displaying the onboarding side content.
 * @returns {JSX.Element} The OnBoardingSide component.
 */
function OnBoardingSide() {
  return (
    <div className="hidden px-12 py-5 md:block md:h-full md:basis-1/2">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-4xl bg-gradient-to-t from-[#030018] via-[#150F33] to-[#3A2D68]">
        <svg
          width="654"
          height="584"
          viewBox="0 0 654 584"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[-140px]"
        >
          <path
            d="M440.452 545.323C440.602 545.065 440.515 544.733 440.257 544.583L436.051 542.127C435.793 541.977 435.462 542.064 435.311 542.322C435.16 542.58 435.247 542.911 435.505 543.062L439.244 545.244L437.062 548.983C436.911 549.241 436.998 549.573 437.256 549.723C437.515 549.874 437.846 549.787 437.997 549.529L440.452 545.323ZM-4.80162 494.408L-4.26312 494.355L-4.80162 494.408ZM654.38 251.187L654.899 251.035L654.38 251.187ZM-4.683 177.702L-4.14786 177.622L-4.683 177.702ZM662.035 38.4032L661.495 38.3828L662.035 38.4032ZM-37.0682 -42.0249C-36.9412 -41.4989 -36.9412 -41.4989 -36.9412 -41.4989C-36.9412 -41.4989 -36.9411 -41.4989 -36.9411 -41.4989C-36.941 -41.4989 -36.9408 -41.499 -36.9406 -41.499C-36.9402 -41.4991 -36.9396 -41.4993 -36.9387 -41.4995C-36.937 -41.4999 -36.9345 -41.5005 -36.9311 -41.5013C-36.9242 -41.503 -36.914 -41.5055 -36.9003 -41.5088C-36.8729 -41.5153 -36.8318 -41.5252 -36.7771 -41.5383C-36.6678 -41.5646 -36.5041 -41.6037 -36.2872 -41.6554C-35.8533 -41.7588 -35.206 -41.9123 -34.3534 -42.1127C-32.6482 -42.5133 -30.1212 -43.1014 -26.8356 -43.8507L-27.0762 -44.9058C-30.3642 -44.156 -32.8935 -43.5674 -34.601 -43.1662C-35.4547 -42.9656 -36.103 -42.8118 -36.538 -42.7082C-36.7555 -42.6564 -36.9197 -42.6171 -37.0295 -42.5907C-37.0845 -42.5776 -37.1258 -42.5676 -37.1535 -42.561C-37.1673 -42.5576 -37.1777 -42.5551 -37.1847 -42.5535C-37.1881 -42.5526 -37.1908 -42.552 -37.1925 -42.5516C-37.1934 -42.5514 -37.1941 -42.5512 -37.1945 -42.5511C-37.1947 -42.551 -37.1949 -42.551 -37.195 -42.551C-37.1951 -42.551 -37.1951 -42.5509 -37.1952 -42.5509C-37.1952 -42.5509 -37.1952 -42.5509 -37.0682 -42.0249ZM-5.63681 -48.5472C0.510292 -49.874 7.46782 -51.3478 15.1499 -52.9329L14.9312 -53.9929C7.24575 -52.407 0.285011 -50.9325 -5.86514 -49.6051L-5.63681 -48.5472ZM36.1868 -57.1806C42.8656 -58.5001 49.9157 -59.8658 57.3001 -61.2623L57.099 -62.3257C49.7116 -60.9286 42.6586 -59.5624 35.977 -58.2423L36.1868 -57.1806ZM78.4853 -65.1799C85.3592 -66.4223 92.4568 -67.6771 99.7541 -68.9344L99.5704 -70.0009C92.27 -68.7431 85.1696 -67.4878 78.2928 -66.2449L78.4853 -65.1799ZM120.784 -72.469C127.697 -73.6014 134.755 -74.7284 141.941 -75.8426L141.775 -76.9121C134.586 -75.7974 127.525 -74.6699 120.61 -73.537L120.784 -72.469ZM163.226 -79.0469C170.236 -80.0699 177.343 -81.0753 184.535 -82.0567L184.389 -83.129C177.194 -82.1471 170.082 -81.1413 163.07 -80.1178L163.226 -79.0469ZM205.743 -84.847C212.795 -85.7396 219.912 -86.6048 227.08 -87.4369L226.955 -88.512C219.783 -87.6794 212.663 -86.8138 205.607 -85.9206L205.743 -84.847ZM248.447 -89.8001C255.524 -90.543 262.637 -91.2494 269.775 -91.9143L269.674 -92.9919C262.533 -92.3266 255.415 -91.6198 248.334 -90.8764L248.447 -89.8001ZM291.176 -93.7735C298.302 -94.3466 305.439 -94.8738 312.577 -95.35L312.504 -96.4299C305.362 -95.9533 298.22 -95.4258 291.09 -94.8522L291.176 -93.7735ZM334.017 -96.6231C341.179 -96.9942 348.329 -97.3089 355.455 -97.562L355.417 -98.6436C348.285 -98.3902 341.129 -98.0753 333.961 -97.7039L334.017 -96.6231ZM376.894 -98.1344C384.104 -98.2611 391.276 -98.3185 398.398 -98.3012L398.4 -99.3834C391.271 -99.4008 384.092 -99.3433 376.875 -99.2165L376.894 -98.1344ZM419.827 -98.0141C427.037 -97.8352 434.179 -97.5715 441.24 -97.2172L441.294 -98.2981C434.224 -98.6529 427.073 -98.917 419.854 -99.096L419.827 -98.0141ZM462.725 -95.8317C469.952 -95.2572 477.072 -94.576 484.069 -93.7815L484.191 -94.8568C477.181 -95.6528 470.049 -96.3351 462.811 -96.9105L462.725 -95.8317ZM505.216 -90.9683C512.445 -89.8569 519.513 -88.6067 526.4 -87.2094L526.615 -88.27C519.71 -89.671 512.625 -90.9242 505.381 -92.038L505.216 -90.9683ZM547.345 -82.3448C554.437 -80.4714 561.288 -78.4119 567.87 -76.1555L568.221 -77.1793C561.612 -79.4448 554.736 -81.5118 547.621 -83.3912L547.345 -82.3448ZM587.784 -68.3408C594.493 -65.3331 600.83 -62.0643 606.758 -58.5194L607.313 -59.4482C601.345 -63.017 594.97 -66.3051 588.226 -69.3284L587.784 -68.3408ZM624.228 -46.2645C629.835 -41.6291 634.883 -36.6294 639.322 -31.2445L640.157 -31.9329C635.671 -37.375 630.573 -42.4229 624.918 -47.0986L624.228 -46.2645ZM650.976 -13.4902C654.124 -7.28112 656.61 -0.660359 658.382 6.3946L659.431 6.13095C657.64 -1.00149 655.126 -7.698 651.942 -13.9795L650.976 -13.4902ZM661.441 27.4126C661.616 30.9753 661.636 34.6314 661.495 38.3828L662.576 38.4235C662.718 34.642 662.699 30.9546 662.522 27.3595L661.441 27.4126ZM661.495 38.3828C661.351 42.2116 661.038 45.8928 660.561 49.4312L661.634 49.5756C662.115 46.001 662.431 42.2851 662.576 38.4235L661.495 38.3828ZM655.382 70.0614C652.726 76.9262 649.253 83.0792 645.032 88.58L645.89 89.2388C650.175 83.655 653.699 77.4113 656.391 70.4519L655.382 70.0614ZM629.789 103.489C624.253 107.609 618.07 111.171 611.299 114.226L611.744 115.212C618.577 112.129 624.829 108.529 630.435 104.357L629.789 103.489ZM591.123 121.424C584.484 123.266 577.463 124.774 570.099 125.981L570.274 127.049C577.672 125.836 584.731 124.32 591.412 122.467L591.123 121.424ZM548.669 128.595C541.762 129.179 534.625 129.559 527.284 129.757L527.313 130.839C534.673 130.64 541.83 130.259 548.76 129.673L548.669 128.595ZM505.824 129.844C498.789 129.725 491.605 129.47 484.291 129.097L484.236 130.178C491.561 130.552 498.757 130.807 505.805 130.926L505.824 129.844ZM462.711 127.693C455.645 127.142 448.482 126.5 441.238 125.78L441.131 126.857C448.382 127.577 455.553 128.22 462.627 128.772L462.711 127.693ZM419.866 123.472C412.779 122.65 405.632 121.769 398.439 120.84L398.3 121.913C405.497 122.843 412.649 123.725 419.741 124.547L419.866 123.472ZM377.039 117.965C369.962 116.982 362.854 115.964 355.729 114.923L355.573 115.994C362.7 117.035 369.81 118.053 376.89 119.037L377.039 117.965ZM334.384 111.753C327.28 110.684 320.173 109.603 313.074 108.521L312.911 109.591C320.01 110.673 327.118 111.754 334.223 112.824L334.384 111.753ZM291.736 105.269C284.598 104.184 277.482 103.11 270.401 102.056L270.242 103.126C277.321 104.18 284.436 105.254 291.574 106.339L291.736 105.269ZM249.125 98.9453C241.922 97.9149 234.771 96.9183 227.686 95.9677L227.542 97.0403C234.623 97.9905 241.771 98.9866 248.972 100.017L249.125 98.9453ZM206.268 93.2196C199.057 92.3414 191.934 91.5261 184.914 90.7873L184.801 91.8636C191.814 92.6017 198.931 93.4164 206.137 94.2939L206.268 93.2196ZM163.422 88.7499C156.069 88.1371 148.856 87.6305 141.806 87.2473L141.747 88.328C148.786 88.7105 155.988 89.2163 163.332 89.8284L163.422 88.7499ZM120.21 86.4698C112.786 86.3527 105.587 86.41 98.6414 86.6655L98.6812 87.747C105.605 87.4923 112.785 87.4351 120.193 87.5519L120.21 86.4698ZM77.1247 88.2096C69.6031 89.0482 62.4763 90.1993 55.7916 91.7027L56.0291 92.7586C62.669 91.2652 69.756 90.1201 77.2446 89.2852L77.1247 88.2096ZM35.1166 98.1129C28.0764 101.035 21.803 104.577 16.393 108.819L17.0608 109.671C22.3814 105.499 28.5664 102.003 35.5315 99.1125L35.1166 98.1129ZM2.10699 124.949C-1.38029 130.846 -3.86962 137.533 -5.27047 145.083L-4.20638 145.281C-2.82696 137.846 -0.379619 131.28 3.03854 125.5L2.10699 124.949ZM-6.4105 166.562C-6.19688 170.156 -5.80125 173.894 -5.21814 177.782L-4.14786 177.622C-4.72654 173.764 -5.1186 170.057 -5.33016 166.498L-6.4105 166.562ZM-5.21814 177.782C-4.63872 181.646 -3.91864 185.342 -3.06213 188.877L-2.01032 188.622C-2.85886 185.12 -3.57293 181.455 -4.14786 177.622L-5.21814 177.782ZM4.26035 209.381C7.64086 216.205 11.7414 222.175 16.5026 227.361L17.2998 226.629C12.6102 221.521 8.56693 215.636 5.23013 208.901L4.26035 209.381ZM33.4669 241.102C39.5414 244.735 46.208 247.656 53.4036 249.94L53.731 248.909C46.6052 246.647 40.0166 243.759 34.0224 240.173L33.4669 241.102ZM74.7291 254.714C81.6594 255.713 88.9345 256.301 96.5165 256.525L96.5484 255.443C89.0015 255.22 81.7677 254.635 74.8835 253.643L74.7291 254.714ZM118.357 256.246C125.411 255.889 132.672 255.29 140.114 254.48L139.997 253.404C132.572 254.213 125.333 254.81 118.302 255.165L118.357 256.246ZM161.763 251.627C168.821 250.55 176.01 249.322 183.313 247.965L183.115 246.901C175.823 248.256 168.645 249.482 161.6 250.557L161.763 251.627ZM204.774 243.695C211.797 242.213 218.903 240.637 226.077 238.987L225.835 237.933C218.666 239.581 211.566 241.155 204.551 242.636L204.774 243.695ZM247.259 233.961C254.272 232.252 261.335 230.49 268.434 228.692L268.168 227.643C261.071 229.44 254.012 231.201 247.003 232.91L247.259 233.961ZM289.589 223.269C296.607 221.453 303.647 219.618 310.697 217.78L310.424 216.733C303.374 218.571 296.334 220.406 289.318 222.222L289.589 223.269ZM331.801 212.288C338.854 210.46 345.903 208.645 352.936 206.857L352.67 205.808C345.634 207.596 338.583 209.412 331.53 211.24L331.801 212.288ZM374.078 201.569C381.173 199.827 388.239 198.13 395.263 196.493L395.018 195.439C387.989 197.077 380.918 198.775 373.82 200.518L374.078 201.569ZM416.578 191.701C423.767 190.149 430.897 188.68 437.952 187.313L437.746 186.25C430.683 187.619 423.545 189.09 416.349 190.643L416.578 191.701ZM459.38 183.451C466.648 182.248 473.816 181.179 480.866 180.265L480.727 179.192C473.663 180.107 466.482 181.178 459.203 182.383L459.38 183.451ZM502.508 177.938C509.941 177.317 517.212 176.91 524.296 176.743L524.27 175.661C517.162 175.828 509.87 176.237 502.418 176.86L502.508 177.938ZM546.073 177.053C553.551 177.471 560.763 178.23 567.678 179.367L567.854 178.3C560.896 177.155 553.645 176.392 546.133 175.972L546.073 177.053ZM588.763 184.354C595.845 186.613 602.499 189.413 608.681 192.81L609.202 191.862C602.953 188.427 596.233 185.601 589.092 183.323L588.763 184.354ZM626.293 205.331C631.512 210.081 636.202 215.506 640.314 221.667L641.214 221.066C637.053 214.832 632.306 209.34 627.022 204.53L626.293 205.331ZM650.248 240.799C651.575 244.155 652.781 247.667 653.861 251.34L654.899 251.035C653.81 247.332 652.594 243.789 651.254 240.401L650.248 240.799ZM653.861 251.34C654.956 255.065 655.861 258.694 656.581 262.229L657.642 262.013C656.915 258.446 656.002 254.788 654.899 251.035L653.861 251.34ZM658.73 283.585C658.635 291.121 657.555 298.153 655.567 304.721L656.603 305.035C658.621 298.364 659.716 291.23 659.812 283.598L658.73 283.585ZM646.318 324.036C642.402 329.812 637.613 335.148 632.031 340.083L632.747 340.894C638.39 335.906 643.241 330.503 647.214 324.644L646.318 324.036ZM614.614 352.746C608.71 356.319 602.292 359.629 595.409 362.698L595.85 363.686C602.768 360.602 609.226 357.272 615.174 353.671L614.614 352.746ZM575.194 370.598C568.553 372.877 561.602 374.992 554.372 376.957L554.656 378.001C561.906 376.031 568.88 373.909 575.546 371.622L575.194 370.598ZM533.348 382.098C526.472 383.61 519.399 385.014 512.152 386.322L512.344 387.387C519.603 386.077 526.689 384.67 533.58 383.155L533.348 382.098ZM490.729 389.841C483.656 390.898 476.451 391.879 469.132 392.793L469.266 393.867C476.593 392.952 483.807 391.97 490.889 390.912L490.729 389.841ZM447.577 395.265C440.466 396.013 433.27 396.708 426.004 397.359L426.101 398.437C433.372 397.786 440.573 397.09 447.69 396.341L447.577 395.265ZM404.316 399.157C397.139 399.709 389.91 400.225 382.644 400.711L382.716 401.791C389.985 401.304 397.218 400.788 404.399 400.236L404.316 399.157ZM360.984 402.076C353.765 402.505 346.524 402.913 339.275 403.304L339.333 404.385C346.584 403.993 353.827 403.586 361.048 403.157L360.984 402.076ZM317.588 404.436C310.338 404.804 303.094 405.162 295.869 405.518L295.923 406.599C303.147 406.243 310.392 405.885 317.643 405.517L317.588 404.436ZM274.178 406.589C266.909 406.951 259.675 407.317 252.49 407.694L252.546 408.775C259.731 408.398 266.964 408.032 274.232 407.67L274.178 406.589ZM230.74 408.884C223.446 409.303 216.22 409.74 209.077 410.203L209.147 411.283C216.287 410.82 223.511 410.383 230.802 409.965L230.74 408.884ZM187.455 411.714C180.083 412.27 172.823 412.864 165.693 413.505L165.789 414.582C172.914 413.942 180.169 413.349 187.537 412.793L187.455 411.714ZM144.038 415.648C136.686 416.45 129.507 417.317 122.525 418.258L122.669 419.331C129.642 418.39 136.812 417.525 144.156 416.724L144.038 415.648ZM101.164 421.494C93.726 422.759 86.5728 424.136 79.7394 425.642L79.9723 426.699C86.7863 425.198 93.9222 423.824 101.346 422.561L101.164 421.494ZM58.6312 431.03C51.2691 433.209 44.4252 435.601 38.1613 438.237L38.581 439.234C44.8018 436.617 51.6072 434.237 58.9383 432.068L58.6312 431.03ZM18.7807 448.447C12.2065 452.852 6.8268 457.776 2.80842 463.294L3.68328 463.931C7.61147 458.537 12.8902 453.697 19.3831 449.347L18.7807 448.447ZM-5.22926 483.324C-5.68201 486.863 -5.72525 490.572 -5.34011 494.462L-4.26312 494.355C-4.64079 490.541 -4.59745 486.914 -4.15576 483.461L-5.22926 483.324ZM-5.34011 494.462C-4.95789 498.321 -4.34649 502.029 -3.51653 505.59L-2.46253 505.344C-3.28144 501.831 -3.88537 498.169 -4.26312 494.355L-5.34011 494.462ZM4.59645 526.284C8.32358 532.743 12.9798 538.544 18.4478 543.738L19.1932 542.953C13.7952 537.825 9.20542 532.106 5.53385 525.743L4.59645 526.284ZM36.247 557.014C42.4318 560.668 49.177 563.878 56.3992 566.682L56.7909 565.673C49.616 562.887 42.925 559.702 36.7975 556.082L36.247 557.014ZM77.5146 573.432C84.4838 575.246 91.7567 576.782 99.2796 578.065L99.4617 576.999C91.9656 575.72 84.7231 574.19 77.7872 572.384L77.5146 573.432ZM121.357 581.061C128.602 581.813 136.013 582.375 143.55 582.766L143.606 581.686C136.086 581.296 128.693 580.735 121.469 579.984L121.357 581.061ZM165.744 583.436C173.083 583.509 180.501 583.444 187.963 583.257L187.936 582.175C180.485 582.362 173.08 582.427 165.755 582.354L165.744 583.436ZM210.171 582.362C217.565 581.956 224.969 581.448 232.35 580.852L232.263 579.773C224.89 580.369 217.496 580.876 210.112 581.281L210.171 582.362ZM254.486 578.807C261.915 578.038 269.288 577.193 276.569 576.289L276.436 575.215C269.161 576.118 261.796 576.962 254.374 577.731L254.486 578.807ZM298.588 573.347C306.054 572.28 313.379 571.166 320.522 570.022L320.351 568.953C313.214 570.096 305.895 571.21 298.435 572.275L298.588 573.347ZM342.446 566.331C350.064 564.987 357.392 563.631 364.373 562.29L364.169 561.227C357.193 562.567 349.87 563.923 342.258 565.265L342.446 566.331ZM386.062 557.957C394.093 556.291 401.418 554.702 407.904 553.251L407.668 552.195C401.187 553.644 393.867 555.232 385.842 556.897L386.062 557.957ZM429.363 548.26C432.83 547.419 435.519 546.748 437.342 546.286C438.253 546.056 438.948 545.877 439.415 545.757C439.648 545.697 439.825 545.651 439.943 545.62C440.002 545.605 440.047 545.593 440.077 545.585C440.092 545.581 440.103 545.578 440.11 545.576C440.114 545.575 440.117 545.574 440.119 545.574C440.12 545.574 440.121 545.574 440.121 545.573C440.121 545.573 440.122 545.573 440.122 545.573C440.122 545.573 440.122 545.573 440.122 545.573C440.122 545.573 440.122 545.573 439.984 545.05C439.847 544.526 439.847 544.526 439.847 544.526C439.847 544.526 439.847 544.526 439.847 544.527C439.846 544.527 439.846 544.527 439.846 544.527C439.846 544.527 439.845 544.527 439.844 544.527C439.842 544.528 439.84 544.528 439.836 544.529C439.829 544.531 439.817 544.534 439.803 544.538C439.773 544.546 439.729 544.557 439.67 544.573C439.553 544.603 439.377 544.649 439.144 544.709C438.679 544.829 437.986 545.007 437.076 545.237C435.257 545.698 432.571 546.369 429.108 547.208L429.363 548.26Z"
            fill="#9E7FFB"
          />
        </svg>

        <div className="bg-primary-dark animate-fadeInUp z-20 flex h-24 w-96 rotate-[-3.14deg] items-center gap-3 rounded-4xl pl-4 drop-shadow-[0_15px_10px_#33275e75]">
          <ProfileImage image="/001.png" width="w-16" height="h-16" />
          <div>
            <h2 className="m-0 p-0 text-2xl font-bold text-white">
              Abdone 💘💘
            </h2>
            <p className="text-md m-0 p-0 text-[#EDE7FF]">
              I got you the bag...
            </p>
          </div>
        </div>
        <div className="animate-fadeInUp mt-2 mb-4 flex h-24 w-md rotate-[3.14deg] items-center gap-3 rounded-4xl bg-white pl-4">
          <ProfileImage image="/002.png" width="w-16" height="h-16" />
          <div>
            <h2 className="text-bg-dark m-0 p-0 text-2xl font-bold">
              My Wife 🔒💖
            </h2>
            <p className="text-md text-bg-dark m-0 p-0">
              I am going to the market, do you...
            </p>
          </div>
        </div>
        <div className="animate-fadeInUp bg-accent-dark flex h-24 w-96 rotate-[-1.15deg] items-center gap-3 rounded-4xl pl-4">
          <ProfileImage image="/003.png" width="w-16" height="h-16" />
          <div>
            <h2 className="text-dark m-0 p-0 text-2xl font-bold">
              Captain 🫡🫡
            </h2>
            <p className="text-md text-bg-dark m-0 p-0">I got you the bag...</p>
          </div>
        </div>
        <div className="z-20 mt-20 text-center">
          <p className="text-5xl font-medium text-white">
            <span className="bg-gradient-to-l from-[#6F00FF] to-[#00FF7F] bg-clip-text font-extrabold text-transparent">
              Chatting
            </span>{" "}
            made easy!
          </p>
          <p className="mt-4 text-lg/tight font-light text-white">
            Connect and chat with friend, collegues and family
            <br />
            seamlessly with chatterbox.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OnBoardingSide;
