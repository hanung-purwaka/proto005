import joojaebum11 from '../../../assets/images/levels/joojaebum-11.png';
import type { CompiledLevelData } from '@shared/puzzle';

export const levelImageManifest = {
  'joojaebum-11.png': joojaebum11,
} as const;

export const levelBank = [
  {
    "id": "sample-bloom",
    "image": "joojaebum-11.png",
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
  }
] satisfies CompiledLevelData[];

export function getCompiledLevel(levelId: string): CompiledLevelData {
  const level = levelBank.find((entry) => entry.id === levelId);

  if (!level) {
    throw new Error(`Unknown compiled level: ${levelId}`);
  }

  return level;
}
