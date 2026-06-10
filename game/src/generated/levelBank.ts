import level1 from '../../../assets/images/levels/level1.png';
import level2 from '../../../assets/images/levels/level2.png';
import type { CompiledLevelData } from '@shared/puzzle';

export const levelImageManifest = {
  'level1.png': level1,
  'level2.png': level2,
} as const;

export const levelBank = [
  {
    "id": "sample-bloom",
    "image": "level1.png",
    "imageKey": "level-image:sample-bloom",
    "grid": {
      "rows": 6,
      "cols": 6
    },
    "pieces": [
      {
        "id": "petal-a",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            1,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 1
        },
        "startOrigin": {
          "row": 0,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 2
          },
          {
            "row": 2,
            "col": 1
          }
        ],
        "startCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "petal-b",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            1,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 3
        },
        "startOrigin": {
          "row": 0,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 3
          },
          {
            "row": 1,
            "col": 4
          },
          {
            "row": 2,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 0,
            "col": 4
          },
          {
            "row": 0,
            "col": 5
          },
          {
            "row": 1,
            "col": 5
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "petal-c",
        "thickness": 14,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            1,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 2,
          "col": 2
        },
        "startOrigin": {
          "row": 0,
          "col": 2
        },
        "solvedCells": [
          {
            "row": 2,
            "col": 2
          },
          {
            "row": 2,
            "col": 3
          },
          {
            "row": 3,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 0,
            "col": 2
          },
          {
            "row": 0,
            "col": 3
          },
          {
            "row": 1,
            "col": 2
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "stem-a",
        "thickness": 20,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            0
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 1
        },
        "startOrigin": {
          "row": 2,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 1
          },
          {
            "row": 4,
            "col": 1
          },
          {
            "row": 4,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 3,
            "col": 0
          },
          {
            "row": 3,
            "col": 1
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "stem-b",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            1,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 3
        },
        "startOrigin": {
          "row": 2,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 3
          },
          {
            "row": 3,
            "col": 4
          },
          {
            "row": 4,
            "col": 3
          }
        ],
        "startCells": [
          {
            "row": 2,
            "col": 4
          },
          {
            "row": 2,
            "col": 5
          },
          {
            "row": 3,
            "col": 4
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "leaf-a",
        "thickness": 22,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            1
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 4,
          "col": 3
        },
        "startOrigin": {
          "row": 4,
          "col": 2
        },
        "solvedCells": [
          {
            "row": 4,
            "col": 4
          },
          {
            "row": 5,
            "col": 3
          },
          {
            "row": 5,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 4,
            "col": 3
          },
          {
            "row": 5,
            "col": 2
          },
          {
            "row": 5,
            "col": 3
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "leaf-b",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 0,
          "maxCol": 1,
          "width": 2,
          "height": 1
        },
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 5,
          "col": 1
        },
        "startOrigin": {
          "row": 4,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 5,
            "col": 1
          },
          {
            "row": 5,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 4,
            "col": 0
          },
          {
            "row": 4,
            "col": 1
          }
        ],
        "width": 2,
        "height": 1
      }
    ],
    "solvedBounds": {
      "minRow": 1,
      "minCol": 1,
      "maxRow": 5,
      "maxCol": 4,
      "width": 4,
      "height": 5
    },
    "solvedCellCount": 20
  },
  {
    "id": "level2",
    "image": "level2.png",
    "imageKey": "level-image:level2",
    "grid": {
      "rows": 7,
      "cols": 7
    },
    "pieces": [
      {
        "id": "square",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 0,
          "col": 0
        },
        "startOrigin": {
          "row": 1,
          "col": 1
        },
        "solvedCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 2
          },
          {
            "row": 2,
            "col": 1
          },
          {
            "row": 2,
            "col": 2
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "l4",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 2,
          "width": 3,
          "height": 2
        },
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            2
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 2
          },
          {
            "row": 1,
            "col": 2
          }
        ],
        "solvedOrigin": {
          "row": 0,
          "col": 2
        },
        "startOrigin": {
          "row": 0,
          "col": 3
        },
        "solvedCells": [
          {
            "row": 0,
            "col": 2
          },
          {
            "row": 0,
            "col": 3
          },
          {
            "row": 0,
            "col": 4
          },
          {
            "row": 1,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 0,
            "col": 3
          },
          {
            "row": 0,
            "col": 4
          },
          {
            "row": 0,
            "col": 5
          },
          {
            "row": 1,
            "col": 5
          }
        ],
        "width": 3,
        "height": 2
      },
      {
        "id": "i4-a",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 3,
          "maxCol": 0,
          "width": 1,
          "height": 4
        },
        "cells": [
          [
            0,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            3,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 3,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 0,
          "col": 5
        },
        "startOrigin": {
          "row": 1,
          "col": 6
        },
        "solvedCells": [
          {
            "row": 0,
            "col": 5
          },
          {
            "row": 1,
            "col": 5
          },
          {
            "row": 2,
            "col": 5
          },
          {
            "row": 3,
            "col": 5
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 6
          },
          {
            "row": 2,
            "col": 6
          },
          {
            "row": 3,
            "col": 6
          },
          {
            "row": 4,
            "col": 6
          }
        ],
        "width": 1,
        "height": 4
      },
      {
        "id": "t4",
        "thickness": 17,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 2,
          "maxCol": 1,
          "width": 2,
          "height": 3
        },
        "cells": [
          [
            0,
            1
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            2,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 2,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 1
        },
        "startOrigin": {
          "row": 4,
          "col": 1
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 2
          },
          {
            "row": 2,
            "col": 1
          },
          {
            "row": 2,
            "col": 2
          },
          {
            "row": 3,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 4,
            "col": 2
          },
          {
            "row": 5,
            "col": 1
          },
          {
            "row": 5,
            "col": 2
          },
          {
            "row": 6,
            "col": 2
          }
        ],
        "width": 2,
        "height": 3
      },
      {
        "id": "z4",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 2,
          "maxCol": 1,
          "width": 2,
          "height": 3
        },
        "cells": [
          [
            0,
            0
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            2,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 2,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 3
        },
        "startOrigin": {
          "row": 1,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 3
          },
          {
            "row": 2,
            "col": 3
          },
          {
            "row": 2,
            "col": 4
          },
          {
            "row": 3,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 4
          },
          {
            "row": 2,
            "col": 4
          },
          {
            "row": 2,
            "col": 5
          },
          {
            "row": 3,
            "col": 5
          }
        ],
        "width": 2,
        "height": 3
      },
      {
        "id": "i4-b",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 3,
          "maxCol": 0,
          "width": 1,
          "height": 4
        },
        "cells": [
          [
            0,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            3,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 3,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 2,
          "col": 0
        },
        "startOrigin": {
          "row": 0,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 3,
            "col": 0
          },
          {
            "row": 4,
            "col": 0
          },
          {
            "row": 5,
            "col": 0
          }
        ],
        "startCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 3,
            "col": 0
          }
        ],
        "width": 1,
        "height": 4
      },
      {
        "id": "l3-a",
        "thickness": 20,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            0
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 1
        },
        "startOrigin": {
          "row": 5,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 1
          },
          {
            "row": 4,
            "col": 1
          },
          {
            "row": 4,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 0
          },
          {
            "row": 6,
            "col": 0
          },
          {
            "row": 6,
            "col": 1
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "i3",
        "thickness": 15,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 2,
          "maxCol": 0,
          "width": 1,
          "height": 3
        },
        "cells": [
          [
            0,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 3
        },
        "startOrigin": {
          "row": 4,
          "col": 3
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 3
          },
          {
            "row": 4,
            "col": 3
          },
          {
            "row": 5,
            "col": 3
          }
        ],
        "startCells": [
          {
            "row": 4,
            "col": 3
          },
          {
            "row": 5,
            "col": 3
          },
          {
            "row": 6,
            "col": 3
          }
        ],
        "width": 1,
        "height": 3
      },
      {
        "id": "l3-b",
        "thickness": 20,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            1,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 4,
          "col": 4
        },
        "startOrigin": {
          "row": 4,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 4,
            "col": 4
          },
          {
            "row": 4,
            "col": 5
          },
          {
            "row": 5,
            "col": 5
          }
        ],
        "startCells": [
          {
            "row": 4,
            "col": 4
          },
          {
            "row": 4,
            "col": 5
          },
          {
            "row": 5,
            "col": 5
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "domino",
        "thickness": 14,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 0,
          "maxCol": 1,
          "width": 2,
          "height": 1
        },
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 5,
          "col": 1
        },
        "startOrigin": {
          "row": 6,
          "col": 5
        },
        "solvedCells": [
          {
            "row": 5,
            "col": 1
          },
          {
            "row": 5,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 6,
            "col": 5
          },
          {
            "row": 6,
            "col": 6
          }
        ],
        "width": 2,
        "height": 1
      },
      {
        "id": "mono",
        "thickness": 12,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 0,
          "maxCol": 0,
          "width": 1,
          "height": 1
        },
        "cells": [
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 5,
          "col": 4
        },
        "startOrigin": {
          "row": 5,
          "col": 6
        },
        "solvedCells": [
          {
            "row": 5,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 6
          }
        ],
        "width": 1,
        "height": 1
      }
    ],
    "solvedBounds": {
      "minRow": 0,
      "minCol": 0,
      "maxRow": 5,
      "maxCol": 5,
      "width": 6,
      "height": 6
    },
    "solvedCellCount": 36
  },
  {
    "id": "level1-mirror-h",
    "image": "level1.png",
    "imageKey": "level-image:level1-mirror-h",
    "grid": {
      "rows": 6,
      "cols": 6
    },
    "pieces": [
      {
        "id": "petal-a",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            1
          ],
          [
            0,
            0
          ],
          [
            1,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 3
        },
        "startOrigin": {
          "row": 0,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 4
          },
          {
            "row": 1,
            "col": 3
          },
          {
            "row": 2,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 0,
            "col": 5
          },
          {
            "row": 0,
            "col": 4
          },
          {
            "row": 1,
            "col": 5
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "petal-b",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            1
          ],
          [
            0,
            0
          ],
          [
            1,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 1
        },
        "startOrigin": {
          "row": 0,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 2
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 2,
            "col": 1
          }
        ],
        "startCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "petal-c",
        "thickness": 14,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            1
          ],
          [
            0,
            0
          ],
          [
            1,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 2,
          "col": 2
        },
        "startOrigin": {
          "row": 0,
          "col": 2
        },
        "solvedCells": [
          {
            "row": 2,
            "col": 3
          },
          {
            "row": 2,
            "col": 2
          },
          {
            "row": 3,
            "col": 3
          }
        ],
        "startCells": [
          {
            "row": 0,
            "col": 3
          },
          {
            "row": 0,
            "col": 2
          },
          {
            "row": 1,
            "col": 3
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "stem-a",
        "thickness": 20,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            1
          ],
          [
            1,
            1
          ],
          [
            1,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 3
        },
        "startOrigin": {
          "row": 2,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 4
          },
          {
            "row": 4,
            "col": 4
          },
          {
            "row": 4,
            "col": 3
          }
        ],
        "startCells": [
          {
            "row": 2,
            "col": 5
          },
          {
            "row": 3,
            "col": 5
          },
          {
            "row": 3,
            "col": 4
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "stem-b",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            1
          ],
          [
            0,
            0
          ],
          [
            1,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 1
        },
        "startOrigin": {
          "row": 2,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 2
          },
          {
            "row": 3,
            "col": 1
          },
          {
            "row": 4,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 2,
            "col": 1
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 3,
            "col": 1
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "leaf-a",
        "thickness": 22,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            0
          ],
          [
            1,
            1
          ],
          [
            1,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 4,
          "col": 1
        },
        "startOrigin": {
          "row": 4,
          "col": 2
        },
        "solvedCells": [
          {
            "row": 4,
            "col": 1
          },
          {
            "row": 5,
            "col": 2
          },
          {
            "row": 5,
            "col": 1
          }
        ],
        "startCells": [
          {
            "row": 4,
            "col": 2
          },
          {
            "row": 5,
            "col": 3
          },
          {
            "row": 5,
            "col": 2
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "leaf-b",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 0,
          "maxCol": 1,
          "width": 2,
          "height": 1
        },
        "cells": [
          [
            0,
            1
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 5,
          "col": 3
        },
        "startOrigin": {
          "row": 4,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 5,
            "col": 4
          },
          {
            "row": 5,
            "col": 3
          }
        ],
        "startCells": [
          {
            "row": 4,
            "col": 5
          },
          {
            "row": 4,
            "col": 4
          }
        ],
        "width": 2,
        "height": 1
      }
    ],
    "solvedBounds": {
      "minRow": 1,
      "minCol": 1,
      "maxRow": 5,
      "maxCol": 4,
      "width": 4,
      "height": 5
    },
    "solvedCellCount": 20
  },
  {
    "id": "level1-mirror-v",
    "image": "level1.png",
    "imageKey": "level-image:level1-mirror-v",
    "grid": {
      "rows": 6,
      "cols": 6
    },
    "pieces": [
      {
        "id": "petal-a",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 1
        },
        "startOrigin": {
          "row": 4,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 4,
            "col": 1
          },
          {
            "row": 4,
            "col": 2
          },
          {
            "row": 3,
            "col": 1
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 0
          },
          {
            "row": 5,
            "col": 1
          },
          {
            "row": 4,
            "col": 0
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "petal-b",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 3
        },
        "startOrigin": {
          "row": 4,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 4,
            "col": 3
          },
          {
            "row": 4,
            "col": 4
          },
          {
            "row": 3,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 4
          },
          {
            "row": 5,
            "col": 5
          },
          {
            "row": 4,
            "col": 5
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "petal-c",
        "thickness": 14,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 2,
          "col": 2
        },
        "startOrigin": {
          "row": 4,
          "col": 2
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 2
          },
          {
            "row": 3,
            "col": 3
          },
          {
            "row": 2,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 2
          },
          {
            "row": 5,
            "col": 3
          },
          {
            "row": 4,
            "col": 2
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "stem-a",
        "thickness": 20,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            0
          ],
          [
            0,
            0
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 1
        },
        "startOrigin": {
          "row": 2,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 2,
            "col": 1
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 3,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 2,
            "col": 1
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "stem-b",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 3
        },
        "startOrigin": {
          "row": 2,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 2,
            "col": 3
          },
          {
            "row": 2,
            "col": 4
          },
          {
            "row": 1,
            "col": 3
          }
        ],
        "startCells": [
          {
            "row": 3,
            "col": 4
          },
          {
            "row": 3,
            "col": 5
          },
          {
            "row": 2,
            "col": 4
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "leaf-a",
        "thickness": 22,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            1
          ],
          [
            0,
            0
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 0,
          "col": 3
        },
        "startOrigin": {
          "row": 0,
          "col": 2
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 4
          },
          {
            "row": 0,
            "col": 3
          },
          {
            "row": 0,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 3
          },
          {
            "row": 0,
            "col": 2
          },
          {
            "row": 0,
            "col": 3
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "leaf-b",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 0,
          "maxCol": 1,
          "width": 2,
          "height": 1
        },
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 0,
          "col": 1
        },
        "startOrigin": {
          "row": 1,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "width": 2,
        "height": 1
      }
    ],
    "solvedBounds": {
      "minRow": 0,
      "minCol": 1,
      "maxRow": 4,
      "maxCol": 4,
      "width": 4,
      "height": 5
    },
    "solvedCellCount": 20
  },
  {
    "id": "level1-rotate-180",
    "image": "level1.png",
    "imageKey": "level-image:level1-rotate-180",
    "grid": {
      "rows": 6,
      "cols": 6
    },
    "pieces": [
      {
        "id": "petal-a",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            1
          ],
          [
            1,
            0
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 3
        },
        "startOrigin": {
          "row": 4,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 4,
            "col": 4
          },
          {
            "row": 4,
            "col": 3
          },
          {
            "row": 3,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 5
          },
          {
            "row": 5,
            "col": 4
          },
          {
            "row": 4,
            "col": 5
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "petal-b",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            1
          ],
          [
            1,
            0
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 1
        },
        "startOrigin": {
          "row": 4,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 4,
            "col": 2
          },
          {
            "row": 4,
            "col": 1
          },
          {
            "row": 3,
            "col": 1
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 1
          },
          {
            "row": 5,
            "col": 0
          },
          {
            "row": 4,
            "col": 0
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "petal-c",
        "thickness": 14,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            1
          ],
          [
            1,
            0
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 2,
          "col": 2
        },
        "startOrigin": {
          "row": 4,
          "col": 2
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 3
          },
          {
            "row": 3,
            "col": 2
          },
          {
            "row": 2,
            "col": 3
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 3
          },
          {
            "row": 5,
            "col": 2
          },
          {
            "row": 4,
            "col": 3
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "stem-a",
        "thickness": 20,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            1
          ],
          [
            0,
            1
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 3
        },
        "startOrigin": {
          "row": 2,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 2,
            "col": 4
          },
          {
            "row": 1,
            "col": 4
          },
          {
            "row": 1,
            "col": 3
          }
        ],
        "startCells": [
          {
            "row": 3,
            "col": 5
          },
          {
            "row": 2,
            "col": 5
          },
          {
            "row": 2,
            "col": 4
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "stem-b",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            1
          ],
          [
            1,
            0
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 1
        },
        "startOrigin": {
          "row": 2,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 2,
            "col": 2
          },
          {
            "row": 2,
            "col": 1
          },
          {
            "row": 1,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 3,
            "col": 1
          },
          {
            "row": 3,
            "col": 0
          },
          {
            "row": 2,
            "col": 1
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "leaf-a",
        "thickness": 22,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 0,
          "col": 1
        },
        "startOrigin": {
          "row": 0,
          "col": 2
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 0,
            "col": 2
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 2
          },
          {
            "row": 0,
            "col": 3
          },
          {
            "row": 0,
            "col": 2
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "leaf-b",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 0,
          "maxCol": 1,
          "width": 2,
          "height": 1
        },
        "cells": [
          [
            0,
            1
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 0,
          "col": 3
        },
        "startOrigin": {
          "row": 1,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 0,
            "col": 4
          },
          {
            "row": 0,
            "col": 3
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 5
          },
          {
            "row": 1,
            "col": 4
          }
        ],
        "width": 2,
        "height": 1
      }
    ],
    "solvedBounds": {
      "minRow": 0,
      "minCol": 1,
      "maxRow": 4,
      "maxCol": 4,
      "width": 4,
      "height": 5
    },
    "solvedCellCount": 20
  },
  {
    "id": "level2-mirror-h",
    "image": "level2.png",
    "imageKey": "level-image:level2-mirror-h",
    "grid": {
      "rows": 7,
      "cols": 7
    },
    "pieces": [
      {
        "id": "square",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            1
          ],
          [
            0,
            0
          ],
          [
            1,
            1
          ],
          [
            1,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 0,
          "col": 5
        },
        "startOrigin": {
          "row": 1,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 0,
            "col": 6
          },
          {
            "row": 0,
            "col": 5
          },
          {
            "row": 1,
            "col": 6
          },
          {
            "row": 1,
            "col": 5
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 5
          },
          {
            "row": 1,
            "col": 4
          },
          {
            "row": 2,
            "col": 5
          },
          {
            "row": 2,
            "col": 4
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "l4",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 2,
          "width": 3,
          "height": 2
        },
        "cells": [
          [
            0,
            2
          ],
          [
            0,
            1
          ],
          [
            0,
            0
          ],
          [
            1,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 2
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 0,
          "col": 2
        },
        "startOrigin": {
          "row": 0,
          "col": 1
        },
        "solvedCells": [
          {
            "row": 0,
            "col": 4
          },
          {
            "row": 0,
            "col": 3
          },
          {
            "row": 0,
            "col": 2
          },
          {
            "row": 1,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 0,
            "col": 3
          },
          {
            "row": 0,
            "col": 2
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "width": 3,
        "height": 2
      },
      {
        "id": "i4-a",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 3,
          "maxCol": 0,
          "width": 1,
          "height": 4
        },
        "cells": [
          [
            0,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            3,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 3,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 0,
          "col": 1
        },
        "startOrigin": {
          "row": 1,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 2,
            "col": 1
          },
          {
            "row": 3,
            "col": 1
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 3,
            "col": 0
          },
          {
            "row": 4,
            "col": 0
          }
        ],
        "width": 1,
        "height": 4
      },
      {
        "id": "t4",
        "thickness": 17,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 2,
          "maxCol": 1,
          "width": 2,
          "height": 3
        },
        "cells": [
          [
            0,
            0
          ],
          [
            1,
            1
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 4
        },
        "startOrigin": {
          "row": 4,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 4
          },
          {
            "row": 2,
            "col": 5
          },
          {
            "row": 2,
            "col": 4
          },
          {
            "row": 3,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 4,
            "col": 4
          },
          {
            "row": 5,
            "col": 5
          },
          {
            "row": 5,
            "col": 4
          },
          {
            "row": 6,
            "col": 4
          }
        ],
        "width": 2,
        "height": 3
      },
      {
        "id": "z4",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 2,
          "maxCol": 1,
          "width": 2,
          "height": 3
        },
        "cells": [
          [
            0,
            1
          ],
          [
            1,
            1
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 2
        },
        "startOrigin": {
          "row": 1,
          "col": 1
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 3
          },
          {
            "row": 2,
            "col": 3
          },
          {
            "row": 2,
            "col": 2
          },
          {
            "row": 3,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 2
          },
          {
            "row": 2,
            "col": 2
          },
          {
            "row": 2,
            "col": 1
          },
          {
            "row": 3,
            "col": 1
          }
        ],
        "width": 2,
        "height": 3
      },
      {
        "id": "i4-b",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 3,
          "maxCol": 0,
          "width": 1,
          "height": 4
        },
        "cells": [
          [
            0,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            3,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 3,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 2,
          "col": 6
        },
        "startOrigin": {
          "row": 0,
          "col": 6
        },
        "solvedCells": [
          {
            "row": 2,
            "col": 6
          },
          {
            "row": 3,
            "col": 6
          },
          {
            "row": 4,
            "col": 6
          },
          {
            "row": 5,
            "col": 6
          }
        ],
        "startCells": [
          {
            "row": 0,
            "col": 6
          },
          {
            "row": 1,
            "col": 6
          },
          {
            "row": 2,
            "col": 6
          },
          {
            "row": 3,
            "col": 6
          }
        ],
        "width": 1,
        "height": 4
      },
      {
        "id": "l3-a",
        "thickness": 20,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            1
          ],
          [
            1,
            1
          ],
          [
            1,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 4
        },
        "startOrigin": {
          "row": 5,
          "col": 5
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 5
          },
          {
            "row": 4,
            "col": 5
          },
          {
            "row": 4,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 6
          },
          {
            "row": 6,
            "col": 6
          },
          {
            "row": 6,
            "col": 5
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "i3",
        "thickness": 15,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 2,
          "maxCol": 0,
          "width": 1,
          "height": 3
        },
        "cells": [
          [
            0,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 3
        },
        "startOrigin": {
          "row": 4,
          "col": 3
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 3
          },
          {
            "row": 4,
            "col": 3
          },
          {
            "row": 5,
            "col": 3
          }
        ],
        "startCells": [
          {
            "row": 4,
            "col": 3
          },
          {
            "row": 5,
            "col": 3
          },
          {
            "row": 6,
            "col": 3
          }
        ],
        "width": 1,
        "height": 3
      },
      {
        "id": "l3-b",
        "thickness": 20,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            0,
            1
          ],
          [
            0,
            0
          ],
          [
            1,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 4,
          "col": 1
        },
        "startOrigin": {
          "row": 4,
          "col": 1
        },
        "solvedCells": [
          {
            "row": 4,
            "col": 2
          },
          {
            "row": 4,
            "col": 1
          },
          {
            "row": 5,
            "col": 1
          }
        ],
        "startCells": [
          {
            "row": 4,
            "col": 2
          },
          {
            "row": 4,
            "col": 1
          },
          {
            "row": 5,
            "col": 1
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "domino",
        "thickness": 14,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 0,
          "maxCol": 1,
          "width": 2,
          "height": 1
        },
        "cells": [
          [
            0,
            1
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 5,
          "col": 4
        },
        "startOrigin": {
          "row": 6,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 5,
            "col": 5
          },
          {
            "row": 5,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 6,
            "col": 1
          },
          {
            "row": 6,
            "col": 0
          }
        ],
        "width": 2,
        "height": 1
      },
      {
        "id": "mono",
        "thickness": 12,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 0,
          "maxCol": 0,
          "width": 1,
          "height": 1
        },
        "cells": [
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 5,
          "col": 2
        },
        "startOrigin": {
          "row": 5,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 5,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 0
          }
        ],
        "width": 1,
        "height": 1
      }
    ],
    "solvedBounds": {
      "minRow": 0,
      "minCol": 1,
      "maxRow": 5,
      "maxCol": 6,
      "width": 6,
      "height": 6
    },
    "solvedCellCount": 36
  },
  {
    "id": "level2-mirror-v",
    "image": "level2.png",
    "imageKey": "level-image:level2-mirror-v",
    "grid": {
      "rows": 7,
      "cols": 7
    },
    "pieces": [
      {
        "id": "square",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            0,
            0
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 5,
          "col": 0
        },
        "startOrigin": {
          "row": 4,
          "col": 1
        },
        "solvedCells": [
          {
            "row": 6,
            "col": 0
          },
          {
            "row": 6,
            "col": 1
          },
          {
            "row": 5,
            "col": 0
          },
          {
            "row": 5,
            "col": 1
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 1
          },
          {
            "row": 5,
            "col": 2
          },
          {
            "row": 4,
            "col": 1
          },
          {
            "row": 4,
            "col": 2
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "l4",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 2,
          "width": 3,
          "height": 2
        },
        "cells": [
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            1,
            2
          ],
          [
            0,
            2
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 2
          },
          {
            "row": 0,
            "col": 2
          }
        ],
        "solvedOrigin": {
          "row": 5,
          "col": 2
        },
        "startOrigin": {
          "row": 5,
          "col": 3
        },
        "solvedCells": [
          {
            "row": 6,
            "col": 2
          },
          {
            "row": 6,
            "col": 3
          },
          {
            "row": 6,
            "col": 4
          },
          {
            "row": 5,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 6,
            "col": 3
          },
          {
            "row": 6,
            "col": 4
          },
          {
            "row": 6,
            "col": 5
          },
          {
            "row": 5,
            "col": 5
          }
        ],
        "width": 3,
        "height": 2
      },
      {
        "id": "i4-a",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 3,
          "maxCol": 0,
          "width": 1,
          "height": 4
        },
        "cells": [
          [
            3,
            0
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 3,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 5
        },
        "startOrigin": {
          "row": 2,
          "col": 6
        },
        "solvedCells": [
          {
            "row": 6,
            "col": 5
          },
          {
            "row": 5,
            "col": 5
          },
          {
            "row": 4,
            "col": 5
          },
          {
            "row": 3,
            "col": 5
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 6
          },
          {
            "row": 4,
            "col": 6
          },
          {
            "row": 3,
            "col": 6
          },
          {
            "row": 2,
            "col": 6
          }
        ],
        "width": 1,
        "height": 4
      },
      {
        "id": "t4",
        "thickness": 17,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 2,
          "maxCol": 1,
          "width": 2,
          "height": 3
        },
        "cells": [
          [
            2,
            1
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 2,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 1
        },
        "startOrigin": {
          "row": 0,
          "col": 1
        },
        "solvedCells": [
          {
            "row": 5,
            "col": 2
          },
          {
            "row": 4,
            "col": 1
          },
          {
            "row": 4,
            "col": 2
          },
          {
            "row": 3,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 2,
            "col": 2
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 2
          },
          {
            "row": 0,
            "col": 2
          }
        ],
        "width": 2,
        "height": 3
      },
      {
        "id": "z4",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 2,
          "maxCol": 1,
          "width": 2,
          "height": 3
        },
        "cells": [
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 3
        },
        "startOrigin": {
          "row": 3,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 5,
            "col": 3
          },
          {
            "row": 4,
            "col": 3
          },
          {
            "row": 4,
            "col": 4
          },
          {
            "row": 3,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 4
          },
          {
            "row": 4,
            "col": 4
          },
          {
            "row": 4,
            "col": 5
          },
          {
            "row": 3,
            "col": 5
          }
        ],
        "width": 2,
        "height": 3
      },
      {
        "id": "i4-b",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 3,
          "maxCol": 0,
          "width": 1,
          "height": 4
        },
        "cells": [
          [
            3,
            0
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 3,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 0
        },
        "startOrigin": {
          "row": 3,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 4,
            "col": 0
          },
          {
            "row": 3,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          }
        ],
        "startCells": [
          {
            "row": 6,
            "col": 0
          },
          {
            "row": 5,
            "col": 0
          },
          {
            "row": 4,
            "col": 0
          },
          {
            "row": 3,
            "col": 0
          }
        ],
        "width": 1,
        "height": 4
      },
      {
        "id": "l3-a",
        "thickness": 20,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            0
          ],
          [
            0,
            0
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 2,
          "col": 1
        },
        "startOrigin": {
          "row": 0,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 1
          },
          {
            "row": 2,
            "col": 1
          },
          {
            "row": 2,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "i3",
        "thickness": 15,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 2,
          "maxCol": 0,
          "width": 1,
          "height": 3
        },
        "cells": [
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 3
        },
        "startOrigin": {
          "row": 0,
          "col": 3
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 3
          },
          {
            "row": 2,
            "col": 3
          },
          {
            "row": 1,
            "col": 3
          }
        ],
        "startCells": [
          {
            "row": 2,
            "col": 3
          },
          {
            "row": 1,
            "col": 3
          },
          {
            "row": 0,
            "col": 3
          }
        ],
        "width": 1,
        "height": 3
      },
      {
        "id": "l3-b",
        "thickness": 20,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 4
        },
        "startOrigin": {
          "row": 1,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 2,
            "col": 4
          },
          {
            "row": 2,
            "col": 5
          },
          {
            "row": 1,
            "col": 5
          }
        ],
        "startCells": [
          {
            "row": 2,
            "col": 4
          },
          {
            "row": 2,
            "col": 5
          },
          {
            "row": 1,
            "col": 5
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "domino",
        "thickness": 14,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 0,
          "maxCol": 1,
          "width": 2,
          "height": 1
        },
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 1
        },
        "startOrigin": {
          "row": 0,
          "col": 5
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 0,
            "col": 5
          },
          {
            "row": 0,
            "col": 6
          }
        ],
        "width": 2,
        "height": 1
      },
      {
        "id": "mono",
        "thickness": 12,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 0,
          "maxCol": 0,
          "width": 1,
          "height": 1
        },
        "cells": [
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 4
        },
        "startOrigin": {
          "row": 1,
          "col": 6
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 6
          }
        ],
        "width": 1,
        "height": 1
      }
    ],
    "solvedBounds": {
      "minRow": 1,
      "minCol": 0,
      "maxRow": 6,
      "maxCol": 5,
      "width": 6,
      "height": 6
    },
    "solvedCellCount": 36
  },
  {
    "id": "level2-rotate-180",
    "image": "level2.png",
    "imageKey": "level-image:level2-rotate-180",
    "grid": {
      "rows": 7,
      "cols": 7
    },
    "pieces": [
      {
        "id": "square",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            1
          ],
          [
            1,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 5,
          "col": 5
        },
        "startOrigin": {
          "row": 4,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 6,
            "col": 6
          },
          {
            "row": 6,
            "col": 5
          },
          {
            "row": 5,
            "col": 6
          },
          {
            "row": 5,
            "col": 5
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 5
          },
          {
            "row": 5,
            "col": 4
          },
          {
            "row": 4,
            "col": 5
          },
          {
            "row": 4,
            "col": 4
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "l4",
        "thickness": 18,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 2,
          "width": 3,
          "height": 2
        },
        "cells": [
          [
            1,
            2
          ],
          [
            1,
            1
          ],
          [
            1,
            0
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 2
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 5,
          "col": 2
        },
        "startOrigin": {
          "row": 5,
          "col": 1
        },
        "solvedCells": [
          {
            "row": 6,
            "col": 4
          },
          {
            "row": 6,
            "col": 3
          },
          {
            "row": 6,
            "col": 2
          },
          {
            "row": 5,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 6,
            "col": 3
          },
          {
            "row": 6,
            "col": 2
          },
          {
            "row": 6,
            "col": 1
          },
          {
            "row": 5,
            "col": 1
          }
        ],
        "width": 3,
        "height": 2
      },
      {
        "id": "i4-a",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 3,
          "maxCol": 0,
          "width": 1,
          "height": 4
        },
        "cells": [
          [
            3,
            0
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 3,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 1
        },
        "startOrigin": {
          "row": 2,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 6,
            "col": 1
          },
          {
            "row": 5,
            "col": 1
          },
          {
            "row": 4,
            "col": 1
          },
          {
            "row": 3,
            "col": 1
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 0
          },
          {
            "row": 4,
            "col": 0
          },
          {
            "row": 3,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          }
        ],
        "width": 1,
        "height": 4
      },
      {
        "id": "t4",
        "thickness": 17,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 2,
          "maxCol": 1,
          "width": 2,
          "height": 3
        },
        "cells": [
          [
            2,
            0
          ],
          [
            1,
            1
          ],
          [
            1,
            0
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 4
        },
        "startOrigin": {
          "row": 0,
          "col": 4
        },
        "solvedCells": [
          {
            "row": 5,
            "col": 4
          },
          {
            "row": 4,
            "col": 5
          },
          {
            "row": 4,
            "col": 4
          },
          {
            "row": 3,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 2,
            "col": 4
          },
          {
            "row": 1,
            "col": 5
          },
          {
            "row": 1,
            "col": 4
          },
          {
            "row": 0,
            "col": 4
          }
        ],
        "width": 2,
        "height": 3
      },
      {
        "id": "z4",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 2,
          "maxCol": 1,
          "width": 2,
          "height": 3
        },
        "cells": [
          [
            2,
            1
          ],
          [
            1,
            1
          ],
          [
            1,
            0
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 2,
            "col": 1
          },
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 3,
          "col": 2
        },
        "startOrigin": {
          "row": 3,
          "col": 1
        },
        "solvedCells": [
          {
            "row": 5,
            "col": 3
          },
          {
            "row": 4,
            "col": 3
          },
          {
            "row": 4,
            "col": 2
          },
          {
            "row": 3,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 5,
            "col": 2
          },
          {
            "row": 4,
            "col": 2
          },
          {
            "row": 4,
            "col": 1
          },
          {
            "row": 3,
            "col": 1
          }
        ],
        "width": 2,
        "height": 3
      },
      {
        "id": "i4-b",
        "thickness": 16,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 3,
          "maxCol": 0,
          "width": 1,
          "height": 4
        },
        "cells": [
          [
            3,
            0
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 3,
            "col": 0
          },
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 6
        },
        "startOrigin": {
          "row": 3,
          "col": 6
        },
        "solvedCells": [
          {
            "row": 4,
            "col": 6
          },
          {
            "row": 3,
            "col": 6
          },
          {
            "row": 2,
            "col": 6
          },
          {
            "row": 1,
            "col": 6
          }
        ],
        "startCells": [
          {
            "row": 6,
            "col": 6
          },
          {
            "row": 5,
            "col": 6
          },
          {
            "row": 4,
            "col": 6
          },
          {
            "row": 3,
            "col": 6
          }
        ],
        "width": 1,
        "height": 4
      },
      {
        "id": "l3-a",
        "thickness": 20,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            1
          ],
          [
            0,
            1
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 2,
          "col": 4
        },
        "startOrigin": {
          "row": 0,
          "col": 5
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 5
          },
          {
            "row": 2,
            "col": 5
          },
          {
            "row": 2,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 6
          },
          {
            "row": 0,
            "col": 6
          },
          {
            "row": 0,
            "col": 5
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "i3",
        "thickness": 15,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 2,
          "maxCol": 0,
          "width": 1,
          "height": 3
        },
        "cells": [
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 2,
            "col": 0
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 3
        },
        "startOrigin": {
          "row": 0,
          "col": 3
        },
        "solvedCells": [
          {
            "row": 3,
            "col": 3
          },
          {
            "row": 2,
            "col": 3
          },
          {
            "row": 1,
            "col": 3
          }
        ],
        "startCells": [
          {
            "row": 2,
            "col": 3
          },
          {
            "row": 1,
            "col": 3
          },
          {
            "row": 0,
            "col": 3
          }
        ],
        "width": 1,
        "height": 3
      },
      {
        "id": "l3-b",
        "thickness": 20,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 1,
          "maxCol": 1,
          "width": 2,
          "height": 2
        },
        "cells": [
          [
            1,
            1
          ],
          [
            1,
            0
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 1,
            "col": 1
          },
          {
            "row": 1,
            "col": 0
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 1
        },
        "startOrigin": {
          "row": 1,
          "col": 1
        },
        "solvedCells": [
          {
            "row": 2,
            "col": 2
          },
          {
            "row": 2,
            "col": 1
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "startCells": [
          {
            "row": 2,
            "col": 2
          },
          {
            "row": 2,
            "col": 1
          },
          {
            "row": 1,
            "col": 1
          }
        ],
        "width": 2,
        "height": 2
      },
      {
        "id": "domino",
        "thickness": 14,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 0,
          "maxCol": 1,
          "width": 2,
          "height": 1
        },
        "cells": [
          [
            0,
            1
          ],
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 4
        },
        "startOrigin": {
          "row": 0,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 5
          },
          {
            "row": 1,
            "col": 4
          }
        ],
        "startCells": [
          {
            "row": 0,
            "col": 1
          },
          {
            "row": 0,
            "col": 0
          }
        ],
        "width": 2,
        "height": 1
      },
      {
        "id": "mono",
        "thickness": 12,
        "bounds": {
          "minRow": 0,
          "minCol": 0,
          "maxRow": 0,
          "maxCol": 0,
          "width": 1,
          "height": 1
        },
        "cells": [
          [
            0,
            0
          ]
        ],
        "localCells": [
          {
            "row": 0,
            "col": 0
          }
        ],
        "solvedOrigin": {
          "row": 1,
          "col": 2
        },
        "startOrigin": {
          "row": 1,
          "col": 0
        },
        "solvedCells": [
          {
            "row": 1,
            "col": 2
          }
        ],
        "startCells": [
          {
            "row": 1,
            "col": 0
          }
        ],
        "width": 1,
        "height": 1
      }
    ],
    "solvedBounds": {
      "minRow": 1,
      "minCol": 1,
      "maxRow": 6,
      "maxCol": 6,
      "width": 6,
      "height": 6
    },
    "solvedCellCount": 36
  }
] satisfies CompiledLevelData[];

export function getCompiledLevel(levelId: string): CompiledLevelData {
  const level = levelBank.find((entry) => entry.id === levelId);

  if (!level) {
    throw new Error(`Unknown compiled level: ${levelId}`);
  }

  return level;
}
