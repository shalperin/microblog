import Foundation

let PT_SIZE = 1.0/72.0 // inches
let FHD_REZ = (w:1920, h:1080) // px
let UHD_REZ = (w:3840, h:2160)
let MY_REZ = (w:1344, h:756)

func findDiag(w:Double, h:Double)-> Double {  // unit is px
    //a^2 + b^2 = c^2
    //c = sqrt (a^2 + b^2)
    return sqrt((w*w) + (h*h))
}

struct Screen {
    var resW = FHD_REZ.w
    var resH = FHD_REZ.h
    var diagDim = 27.0
}

func scaleFactor(
    screen: Screen,
    printMsg: Bool = true
) -> Double {
    let pointsPerInchInPrint = 1.0 / PT_SIZE   // pt

    let pixelsPerInchOfScreen =
    findDiag(w:Double(screen.resW), h:Double(screen.resH)) / screen.diagDim // px
    let scaleFactor = pointsPerInchInPrint / pixelsPerInchOfScreen * 100 //pct

    if (printMsg) {
        print ("""
        A \(screen.diagDim)\" screen,
        with a \(Int(screen.resW)) x \(Int(screen.resH)) resolution*,
        the screen font will be \(Int(scaleFactor))% the size
        of a printed font.**
        """)
    }

    return scaleFactor
}

scaleFactor(screen: Screen(), printMsg: true)
print("")

print("My 46y/o developer eyes prefer...")
scaleFactor(
    screen: Screen(resW: MY_REZ.w, resH: MY_REZ.h, diagDim: 27.0 ),
    printMsg: true
)

print("""

Notes
=====
* Effective resolution:
A \"4k\" (UHD) screen screen with
a resolution of \(Int(UHD_REZ.w))x\(Int(UHD_REZ.h))
at 200% scaling will have the same resolution
as an FHD screen (\(FHD_REZ.w)x\(FHD_REZ.h))

** For the same font size specified in points (pt).

""")
