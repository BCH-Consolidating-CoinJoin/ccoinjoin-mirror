/*
  Contains mocks for unit tests of the p2p.js lib.
*/

'use strict'

const mockLatestData = [
  {
    hash: 'QmemuBhSrV2J4cqsjqwugNfeQ8se3QEzebzpPSRpcFPsXJ',
    id: '/orbitdb/QmSFYQzb4MtowNsZ6hYhBqvQAdPxLUFGj9RH5XY32TTFvU/ccoinjoin',
    payload: {
      op: 'ADD',
      key: null,
      value: {
        peerHash: 'Qmc8uaP9yegYmfxazB2YD7i6G4c2tnQRJvxYyWbM6w6pAm',
        multiaddr:
          '/ip4/10.0.2.15/tcp/4002/ipfs/Qmc8uaP9yegYmfxazB2YD7i6G4c2tnQRJvxYyWbM6w6pAm',
        behindFirewall: true
      }
    },
    next: [
      'QmUtYNGLB35Khymg2KNGeK6ie7UJj2rhBmsihqYB6cnC1Y',
      'QmfE71116grnCqMVYJaoYeFubwNJL96iF29dtt8LYzzrsj',
      'QmUCrEG9zDLx4zsgS53CqU2E3W1JMmdgMkyPTWKapS5qUf',
      'QmPTF1EG44xsNPDBvGSEmM7rsAEbcZsHWCe9BCRZhnNDhi',
      'QmNfK9sB2tZBU2SN5kML1PqdFHGjxHzvH6qRP2rGs1ZnMy',
      'QmUQM64ae6iVBviHBUck4EG1mTGQPqQWNYwx3Uha2oduRF',
      'Qmf7wx6VxQEqXmK5D1AM2sFQJeRP6USJoQ7NHpFYPJZM3H',
      'QmaMrPsB1yLPPVJBZC1CToEGkKTtRiVD8y47EnhhF1nhvi',
      'QmUrJEZFFWNr314Zgm5xy7KdvbsA7DF6Gzey6uLm64bdn9',
      'QmVmqmEDC4ToXNwRatkbqgSEJ7WHCHBEtHBfdfN6pvjukP',
      'Qmbj1cg8gJ8ExoQiPvCz8usxBp9qPd2n8E7qs7cpVaAgyK',
      'QmXH79rgEkqofeYCWjAxbix4Ff7UFTfsLx7r34Zc7g8L2m',
      'QmNzr2s4vHb8wSh2ZfnJfryvVus1uC1PYqoNttB4CoEzLq',
      'QmT4s29xLsAttNncBWxitffzZ7YAduRqcRvLqzNw37XoA7',
      'QmXhZsYposLsFSd51ywXL2BF26oHEajVkWvjv3WddcKNu6',
      'QmVJ1pLXbYCz5c5M7AUsZvSKL7skPCQgymAe7URwXwKNfx',
      'Qmc3j3KM3W9aNGXVq9mjK7LDopgTVZve55ez699WVeh7Cq',
      'QmfMMrA8kcR3qmMcZPM2q8HiMsAYUpJvpy7t41KgRaThbw',
      'QmR2q33YV29Sa9PFvh6J6kPW1jH1WvT6URoeYwAxztLDBu',
      'QmX28A3p6G2Dg3V7miGHSpuJqh8BT6TbAcZSsTXntvkewK',
      'QmdK1fi1xHKPDJPYY113PYzqRgdJL2iwUhV9GbVP5eRtjk',
      'QmTntMu9QrYPcxN5QLzZhHZ5ynNUF6xPKXSjoC5hDPzBr8',
      'QmSK584SZ4pgyLTjsYrF5p5DYNYCCs7x6uDtwFVf7vsop5',
      'QmQoJMAHngHsvwfaaWGbKe7xUbnnh9MCoPSjxd2stsG6Qa',
      'QmSF9U4jqhc4jXt2LPMdP7vdZJbdiU3eGptf6NmCR4hRNz',
      'Qmb3NMi9iTM94kXZVkV3eiVwY9jbPCPiAPiNBjUnoMGhtA',
      'QmTvj8g6SQ2aFuVr4JNee4jNEm17Ni2bVK4mXvof7XGsDD',
      'QmPbEgX8j41jd27R8GitqeULX8dX9i2BpxMvbPToYkuDkB',
      'QmXpjzy8HHefriLcAdoxdum5xv2frkRk11Y8AAmNhJ7xib',
      'QmbSHH1VL4ER3SpcMJHwjr9zUjof2UZ7e7G1k1TTyamfNA',
      'QmUvnzZRgdTwfNJ66ffo7WsuqRG4f61eZrDbj4i3gZud9P',
      'QmPM4LmVtzFh4jM3YueNZ7puzbqnoaJFQ1g1zS8JMeFVEj',
      'QmfXFbUHZhg4gGwheHRc2tkgok5BuZfjvhEGQqtLmFJN69',
      'QmaoY1WQnu2841wSJ7vcGrDzoyA1eArguhWFRxY5wAYkLj',
      'QmYkQmcvQjLpDxUcuNMkkurTeqD4wbTZJMxeFp6KoC7w7R',
      'QmdQgCDgSPnd4z3MJAPtdFhYyBKd5c9cjqTqinRKTZHVPA',
      'QmanaJCT9X4TTZ7LFaXyXt2efbee2UabFQNPtfAj1xNmd2',
      'QmWRQrkMTjutqi6HuinfAZJJz8bAnDa71QBaBdDrAEGxAV',
      'QmWRP3QifRnYrFW1sGKEVPGsKenrQjCePhtKStkt7mPdzQ',
      'QmUD6hkHGuBRDngafs248JfPQeNjE1vBqN3raTq6zkXVwp',
      'QmeL5hz1mxbgdK7W1m4PpNNkaskWbJaEdDuCatg2Tdf5RD',
      'QmXnoY1rSwiDALZzqfyH9ymVTacMTrLJ8HfMWRHKBDG81n',
      'QmQFLVedGuZnezLSfquYqcz5Z9zVJSDpZFwbrG6b5tdBLB',
      'QmPveAxEpTx1o3SqgHxK8zRJkgRDUorLJL95G7pysfckWc',
      'QmVEf47jYTcHEtWRnvyqTs9yGKECcwgNv2WYHZM1EckEQM',
      'QmRcTzwQnjStpmSh3r3Fc2BdKynCRh6NZYVpY8LHsPfQ2g',
      'QmZQFLFm9njFPXB5jFkuSzkWQyRdgesV2QdfV4q35ztbys',
      'QmaT4uyPrzCQTVVmiNFisu3sfVjDBUPv6dMKeoPvuPYSaR',
      'QmNUG7gJF7S3bTtqR7GFRkhuMvX5sCadBNNwNARsFeXCk7',
      'QmNczsS1jHLr7BhMQn6fnQQDNPxSYVvVytfiGfzsUnuEnU',
      'Qmdy4U14X2RUfbydCrDqTg1aiuMj4ZWciFNoxLpFdpMMFd',
      'QmdCBXpyN2yKfbpGqNXzvSXXqhgjoN25mvHNy5PZt877Pi',
      'QmSGLMQ8m4GWDLjTBAx8nCuCaKmWPEz9yXXiSYKcy6LvLv',
      'QmeQFSPDQLUwPVf5RAD1JKwdpzkQcxWnrgss5T4G2Mk2um',
      'QmTkRLnkFAR5DHRfcrLMNCUavZW3atzohgpVzBbyUH2yWn',
      'QmUNxT5P3Y1jJoCuBmmGYKqosfmdMDTLBNk4CsPoPamchb',
      'QmTgV1L4KMpKLTWGnQYwvWR8uMKxbQpUs2UEg272bhwmMt',
      'QmVZHNLph2z51Xba2BpMyG7gFPxbbafBudNp8kmBFhyc1w',
      'QmXDz3cZwLHw6TEorPKjWNjhW3o5gKV8rdqWQNfB8hDSPV',
      'QmXSeYQCu9QVdUmUGSxbycYbaTv5F89bjmzgxEUrz6cZM8',
      'QmU9LWEYFCk2yASYAHRhCPB7KF1VgLZW36LoYF2YFoCYeW',
      'QmSV6wfPS3sZ2yRK6sLuaaxBpYyZSq1kVuYu3EQhLrQUW4',
      'QmYY6TEFnxBBQEFscUDjd3GsYaHpZr8gE5cG4qESVcAgXz',
      'QmTaSHK5tpFRjjSERPykZdhf11WQB8NqQRiV3cuqEsFp8F'
    ],
    v: 0,
    clock: {
      id:
        '04cbb871e25dca482d8ad76867b885184c24c569a528799c5fc72cc6f9b1c841268c208b59c6f9f2e2aee33dd508a0c3a19940dedde06015875e6ad92971dad86a',
      time: 530
    },
    sig:
      '30460221009835822cf8f38324e447b55dbb579fc0312bdc051984c1d12b2e29c9ce38560402210082225cb6c3bd4d0c1cfaa0cfc65e08503fa54808e234dd95512832707108004d',
    key:
      '04cbb871e25dca482d8ad76867b885184c24c569a528799c5fc72cc6f9b1c841268c208b59c6f9f2e2aee33dd508a0c3a19940dedde06015875e6ad92971dad86a'
  },
  {
    hash: 'QmdBTDnCU85iBjyPHKXQyUUtzYGfovfmyPB8DoUKCjjBZX',
    id: '/orbitdb/QmSFYQzb4MtowNsZ6hYhBqvQAdPxLUFGj9RH5XY32TTFvU/ccoinjoin',
    payload: {
      op: 'ADD',
      key: null,
      value: {
        peerHash: 'Qmc8uaP9yegYmfxazB2YD7i6G4c2tnQRJvxYyWbM6w6pDm',
        multiaddr:
          '/ip4/10.0.2.15/tcp/4002/ipfs/Qmc8uaP9yegYmfxazB2YD7i6G4c2tnQRJvxYyWbM6w6pDm',
        behindFirewall: true
      }
    },
    next: [
      'QmemuBhSrV2J4cqsjqwugNfeQ8se3QEzebzpPSRpcFPsXJ',
      'QmUtYNGLB35Khymg2KNGeK6ie7UJj2rhBmsihqYB6cnC1Y',
      'QmfE71116grnCqMVYJaoYeFubwNJL96iF29dtt8LYzzrsj',
      'QmUCrEG9zDLx4zsgS53CqU2E3W1JMmdgMkyPTWKapS5qUf',
      'QmPTF1EG44xsNPDBvGSEmM7rsAEbcZsHWCe9BCRZhnNDhi',
      'QmNfK9sB2tZBU2SN5kML1PqdFHGjxHzvH6qRP2rGs1ZnMy',
      'QmUQM64ae6iVBviHBUck4EG1mTGQPqQWNYwx3Uha2oduRF',
      'Qmf7wx6VxQEqXmK5D1AM2sFQJeRP6USJoQ7NHpFYPJZM3H',
      'QmaMrPsB1yLPPVJBZC1CToEGkKTtRiVD8y47EnhhF1nhvi',
      'QmUrJEZFFWNr314Zgm5xy7KdvbsA7DF6Gzey6uLm64bdn9',
      'QmVmqmEDC4ToXNwRatkbqgSEJ7WHCHBEtHBfdfN6pvjukP',
      'Qmbj1cg8gJ8ExoQiPvCz8usxBp9qPd2n8E7qs7cpVaAgyK',
      'QmXH79rgEkqofeYCWjAxbix4Ff7UFTfsLx7r34Zc7g8L2m',
      'QmNzr2s4vHb8wSh2ZfnJfryvVus1uC1PYqoNttB4CoEzLq',
      'QmT4s29xLsAttNncBWxitffzZ7YAduRqcRvLqzNw37XoA7',
      'QmXhZsYposLsFSd51ywXL2BF26oHEajVkWvjv3WddcKNu6',
      'QmVJ1pLXbYCz5c5M7AUsZvSKL7skPCQgymAe7URwXwKNfx',
      'Qmc3j3KM3W9aNGXVq9mjK7LDopgTVZve55ez699WVeh7Cq',
      'QmfMMrA8kcR3qmMcZPM2q8HiMsAYUpJvpy7t41KgRaThbw',
      'QmR2q33YV29Sa9PFvh6J6kPW1jH1WvT6URoeYwAxztLDBu',
      'QmX28A3p6G2Dg3V7miGHSpuJqh8BT6TbAcZSsTXntvkewK',
      'QmdK1fi1xHKPDJPYY113PYzqRgdJL2iwUhV9GbVP5eRtjk',
      'QmTntMu9QrYPcxN5QLzZhHZ5ynNUF6xPKXSjoC5hDPzBr8',
      'QmSK584SZ4pgyLTjsYrF5p5DYNYCCs7x6uDtwFVf7vsop5',
      'QmQoJMAHngHsvwfaaWGbKe7xUbnnh9MCoPSjxd2stsG6Qa',
      'QmSF9U4jqhc4jXt2LPMdP7vdZJbdiU3eGptf6NmCR4hRNz',
      'Qmb3NMi9iTM94kXZVkV3eiVwY9jbPCPiAPiNBjUnoMGhtA',
      'QmTvj8g6SQ2aFuVr4JNee4jNEm17Ni2bVK4mXvof7XGsDD',
      'QmPbEgX8j41jd27R8GitqeULX8dX9i2BpxMvbPToYkuDkB',
      'QmXpjzy8HHefriLcAdoxdum5xv2frkRk11Y8AAmNhJ7xib',
      'QmbSHH1VL4ER3SpcMJHwjr9zUjof2UZ7e7G1k1TTyamfNA',
      'QmUvnzZRgdTwfNJ66ffo7WsuqRG4f61eZrDbj4i3gZud9P',
      'QmPM4LmVtzFh4jM3YueNZ7puzbqnoaJFQ1g1zS8JMeFVEj',
      'QmfXFbUHZhg4gGwheHRc2tkgok5BuZfjvhEGQqtLmFJN69',
      'QmaoY1WQnu2841wSJ7vcGrDzoyA1eArguhWFRxY5wAYkLj',
      'QmYkQmcvQjLpDxUcuNMkkurTeqD4wbTZJMxeFp6KoC7w7R',
      'QmdQgCDgSPnd4z3MJAPtdFhYyBKd5c9cjqTqinRKTZHVPA',
      'QmanaJCT9X4TTZ7LFaXyXt2efbee2UabFQNPtfAj1xNmd2',
      'QmWRQrkMTjutqi6HuinfAZJJz8bAnDa71QBaBdDrAEGxAV',
      'QmWRP3QifRnYrFW1sGKEVPGsKenrQjCePhtKStkt7mPdzQ',
      'QmUD6hkHGuBRDngafs248JfPQeNjE1vBqN3raTq6zkXVwp',
      'QmeL5hz1mxbgdK7W1m4PpNNkaskWbJaEdDuCatg2Tdf5RD',
      'QmXnoY1rSwiDALZzqfyH9ymVTacMTrLJ8HfMWRHKBDG81n',
      'QmQFLVedGuZnezLSfquYqcz5Z9zVJSDpZFwbrG6b5tdBLB',
      'QmPveAxEpTx1o3SqgHxK8zRJkgRDUorLJL95G7pysfckWc',
      'QmVEf47jYTcHEtWRnvyqTs9yGKECcwgNv2WYHZM1EckEQM',
      'QmRcTzwQnjStpmSh3r3Fc2BdKynCRh6NZYVpY8LHsPfQ2g',
      'QmZQFLFm9njFPXB5jFkuSzkWQyRdgesV2QdfV4q35ztbys',
      'QmaT4uyPrzCQTVVmiNFisu3sfVjDBUPv6dMKeoPvuPYSaR',
      'QmNUG7gJF7S3bTtqR7GFRkhuMvX5sCadBNNwNARsFeXCk7',
      'QmNczsS1jHLr7BhMQn6fnQQDNPxSYVvVytfiGfzsUnuEnU',
      'Qmdy4U14X2RUfbydCrDqTg1aiuMj4ZWciFNoxLpFdpMMFd',
      'QmdCBXpyN2yKfbpGqNXzvSXXqhgjoN25mvHNy5PZt877Pi',
      'QmSGLMQ8m4GWDLjTBAx8nCuCaKmWPEz9yXXiSYKcy6LvLv',
      'QmeQFSPDQLUwPVf5RAD1JKwdpzkQcxWnrgss5T4G2Mk2um',
      'QmTkRLnkFAR5DHRfcrLMNCUavZW3atzohgpVzBbyUH2yWn',
      'QmUNxT5P3Y1jJoCuBmmGYKqosfmdMDTLBNk4CsPoPamchb',
      'QmTgV1L4KMpKLTWGnQYwvWR8uMKxbQpUs2UEg272bhwmMt',
      'QmVZHNLph2z51Xba2BpMyG7gFPxbbafBudNp8kmBFhyc1w',
      'QmXDz3cZwLHw6TEorPKjWNjhW3o5gKV8rdqWQNfB8hDSPV',
      'QmXSeYQCu9QVdUmUGSxbycYbaTv5F89bjmzgxEUrz6cZM8',
      'QmU9LWEYFCk2yASYAHRhCPB7KF1VgLZW36LoYF2YFoCYeW',
      'QmSV6wfPS3sZ2yRK6sLuaaxBpYyZSq1kVuYu3EQhLrQUW4',
      'QmYY6TEFnxBBQEFscUDjd3GsYaHpZr8gE5cG4qESVcAgXz'
    ],
    v: 0,
    clock: {
      id:
        '04cbb871e25dca482d8ad76867b885184c24c569a528799c5fc72cc6f9b1c841268c208b59c6f9f2e2aee33dd508a0c3a19940dedde06015875e6ad92971dad86a',
      time: 531
    },
    sig:
      '30460221009835822cf8f38324e447b55dbb579fc0312bdc051984c1d12b2e29c9ce38560402210082225cb6c3bd4d0c1cfaa0cfc65e08503fa54808e234dd95512832707108004d',
    key:
      '04cbb871e25dca482d8ad76867b885184c24c569a528799c5fc72cc6f9b1c841268c208b59c6f9f2e2aee33dd508a0c3a19940dedde06015875e6ad92971dad86a'
  },
  {
    hash: 'QmdHEF9VtepWqmLcCS6mmSYtGtvbTWP2uSw1BJ5wrXdiTL',
    id: '/orbitdb/QmSFYQzb4MtowNsZ6hYhBqvQAdPxLUFGj9RH5XY32TTFvU/ccoinjoin',
    payload: {
      op: 'ADD',
      key: null,
      value: {
        peerHash: 'Qmc8uaP9yegYmfxazB2YD7i6G4c2tnQRJvxYyWbM6w6pEm',
        multiaddr:
          '/ip4/10.0.2.15/tcp/4002/ipfs/Qmc8uaP9yegYmfxazB2YD7i6G4c2tnQRJvxYyWbM6w6pEm',
        behindFirewall: true
      }
    },
    next: [
      'QmdBTDnCU85iBjyPHKXQyUUtzYGfovfmyPB8DoUKCjjBZX',
      'QmemuBhSrV2J4cqsjqwugNfeQ8se3QEzebzpPSRpcFPsXJ',
      'QmUtYNGLB35Khymg2KNGeK6ie7UJj2rhBmsihqYB6cnC1Y',
      'QmfE71116grnCqMVYJaoYeFubwNJL96iF29dtt8LYzzrsj',
      'QmUCrEG9zDLx4zsgS53CqU2E3W1JMmdgMkyPTWKapS5qUf',
      'QmPTF1EG44xsNPDBvGSEmM7rsAEbcZsHWCe9BCRZhnNDhi',
      'QmNfK9sB2tZBU2SN5kML1PqdFHGjxHzvH6qRP2rGs1ZnMy',
      'QmUQM64ae6iVBviHBUck4EG1mTGQPqQWNYwx3Uha2oduRF',
      'Qmf7wx6VxQEqXmK5D1AM2sFQJeRP6USJoQ7NHpFYPJZM3H',
      'QmaMrPsB1yLPPVJBZC1CToEGkKTtRiVD8y47EnhhF1nhvi',
      'QmUrJEZFFWNr314Zgm5xy7KdvbsA7DF6Gzey6uLm64bdn9',
      'QmVmqmEDC4ToXNwRatkbqgSEJ7WHCHBEtHBfdfN6pvjukP',
      'Qmbj1cg8gJ8ExoQiPvCz8usxBp9qPd2n8E7qs7cpVaAgyK',
      'QmXH79rgEkqofeYCWjAxbix4Ff7UFTfsLx7r34Zc7g8L2m',
      'QmNzr2s4vHb8wSh2ZfnJfryvVus1uC1PYqoNttB4CoEzLq',
      'QmT4s29xLsAttNncBWxitffzZ7YAduRqcRvLqzNw37XoA7',
      'QmXhZsYposLsFSd51ywXL2BF26oHEajVkWvjv3WddcKNu6',
      'QmVJ1pLXbYCz5c5M7AUsZvSKL7skPCQgymAe7URwXwKNfx',
      'Qmc3j3KM3W9aNGXVq9mjK7LDopgTVZve55ez699WVeh7Cq',
      'QmfMMrA8kcR3qmMcZPM2q8HiMsAYUpJvpy7t41KgRaThbw',
      'QmR2q33YV29Sa9PFvh6J6kPW1jH1WvT6URoeYwAxztLDBu',
      'QmX28A3p6G2Dg3V7miGHSpuJqh8BT6TbAcZSsTXntvkewK',
      'QmdK1fi1xHKPDJPYY113PYzqRgdJL2iwUhV9GbVP5eRtjk',
      'QmTntMu9QrYPcxN5QLzZhHZ5ynNUF6xPKXSjoC5hDPzBr8',
      'QmSK584SZ4pgyLTjsYrF5p5DYNYCCs7x6uDtwFVf7vsop5',
      'QmQoJMAHngHsvwfaaWGbKe7xUbnnh9MCoPSjxd2stsG6Qa',
      'QmSF9U4jqhc4jXt2LPMdP7vdZJbdiU3eGptf6NmCR4hRNz',
      'Qmb3NMi9iTM94kXZVkV3eiVwY9jbPCPiAPiNBjUnoMGhtA',
      'QmTvj8g6SQ2aFuVr4JNee4jNEm17Ni2bVK4mXvof7XGsDD',
      'QmPbEgX8j41jd27R8GitqeULX8dX9i2BpxMvbPToYkuDkB',
      'QmXpjzy8HHefriLcAdoxdum5xv2frkRk11Y8AAmNhJ7xib',
      'QmbSHH1VL4ER3SpcMJHwjr9zUjof2UZ7e7G1k1TTyamfNA',
      'QmUvnzZRgdTwfNJ66ffo7WsuqRG4f61eZrDbj4i3gZud9P',
      'QmPM4LmVtzFh4jM3YueNZ7puzbqnoaJFQ1g1zS8JMeFVEj',
      'QmfXFbUHZhg4gGwheHRc2tkgok5BuZfjvhEGQqtLmFJN69',
      'QmaoY1WQnu2841wSJ7vcGrDzoyA1eArguhWFRxY5wAYkLj',
      'QmYkQmcvQjLpDxUcuNMkkurTeqD4wbTZJMxeFp6KoC7w7R',
      'QmdQgCDgSPnd4z3MJAPtdFhYyBKd5c9cjqTqinRKTZHVPA',
      'QmanaJCT9X4TTZ7LFaXyXt2efbee2UabFQNPtfAj1xNmd2',
      'QmWRQrkMTjutqi6HuinfAZJJz8bAnDa71QBaBdDrAEGxAV',
      'QmWRP3QifRnYrFW1sGKEVPGsKenrQjCePhtKStkt7mPdzQ',
      'QmUD6hkHGuBRDngafs248JfPQeNjE1vBqN3raTq6zkXVwp',
      'QmeL5hz1mxbgdK7W1m4PpNNkaskWbJaEdDuCatg2Tdf5RD',
      'QmXnoY1rSwiDALZzqfyH9ymVTacMTrLJ8HfMWRHKBDG81n',
      'QmQFLVedGuZnezLSfquYqcz5Z9zVJSDpZFwbrG6b5tdBLB',
      'QmPveAxEpTx1o3SqgHxK8zRJkgRDUorLJL95G7pysfckWc',
      'QmVEf47jYTcHEtWRnvyqTs9yGKECcwgNv2WYHZM1EckEQM',
      'QmRcTzwQnjStpmSh3r3Fc2BdKynCRh6NZYVpY8LHsPfQ2g',
      'QmZQFLFm9njFPXB5jFkuSzkWQyRdgesV2QdfV4q35ztbys',
      'QmaT4uyPrzCQTVVmiNFisu3sfVjDBUPv6dMKeoPvuPYSaR',
      'QmNUG7gJF7S3bTtqR7GFRkhuMvX5sCadBNNwNARsFeXCk7',
      'QmNczsS1jHLr7BhMQn6fnQQDNPxSYVvVytfiGfzsUnuEnU',
      'Qmdy4U14X2RUfbydCrDqTg1aiuMj4ZWciFNoxLpFdpMMFd',
      'QmdCBXpyN2yKfbpGqNXzvSXXqhgjoN25mvHNy5PZt877Pi',
      'QmSGLMQ8m4GWDLjTBAx8nCuCaKmWPEz9yXXiSYKcy6LvLv',
      'QmeQFSPDQLUwPVf5RAD1JKwdpzkQcxWnrgss5T4G2Mk2um',
      'QmTkRLnkFAR5DHRfcrLMNCUavZW3atzohgpVzBbyUH2yWn',
      'QmUNxT5P3Y1jJoCuBmmGYKqosfmdMDTLBNk4CsPoPamchb',
      'QmTgV1L4KMpKLTWGnQYwvWR8uMKxbQpUs2UEg272bhwmMt',
      'QmVZHNLph2z51Xba2BpMyG7gFPxbbafBudNp8kmBFhyc1w',
      'QmXDz3cZwLHw6TEorPKjWNjhW3o5gKV8rdqWQNfB8hDSPV',
      'QmXSeYQCu9QVdUmUGSxbycYbaTv5F89bjmzgxEUrz6cZM8',
      'QmU9LWEYFCk2yASYAHRhCPB7KF1VgLZW36LoYF2YFoCYeW',
      'QmSV6wfPS3sZ2yRK6sLuaaxBpYyZSq1kVuYu3EQhLrQUW4'
    ],
    v: 0,
    clock: {
      id:
        '04cbb871e25dca482d8ad76867b885184c24c569a528799c5fc72cc6f9b1c841268c208b59c6f9f2e2aee33dd508a0c3a19940dedde06015875e6ad92971dad86a',
      time: 532
    },
    sig:
      '30460221009835822cf8f38324e447b55dbb579fc0312bdc051984c1d12b2e29c9ce38560402210082225cb6c3bd4d0c1cfaa0cfc65e08503fa54808e234dd95512832707108004d',
    key:
      '04cbb871e25dca482d8ad76867b885184c24c569a528799c5fc72cc6f9b1c841268c208b59c6f9f2e2aee33dd508a0c3a19940dedde06015875e6ad92971dad86a'
  }
]

const mockIpfsInfoNoExternal = {
  id: 'QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67',
  publicKey:
    'CAASpgIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCAa5Zevgv51ctXKREokKjJ4VcsgciqSJxeDBjwIBubqS2YAJSoSm0vkzOXS7dpwtRhrO4s2zHxrykPxyUao7Esq3G6fQsykPoqmISWo1FB5uR25MuaiZ/63XXFwE7/72IbBQxflTFI1s9x8Ie7BVPE6lfgqUD8i1NrII7HrQaoZ+L0rGSBsq/EHjJhlKM8/16vPM8c0JGS+cjxjuLUH4Ip/L66RRv65D4ucopQnogGNzHAmypGgFSvc0lzeh6lWI/2Ftf/PBUg6IHQ9JtKbeWaqaRJDI5vYLsNp3HJ3UMkr6DJ2j2c+Lqtf5RIuMyIxsZPTJoixKh8tc77OId7czrVAgMBAAE=',
  addresses: [
    '/ip4/127.0.0.1/tcp/4002/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67',
    '/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67',
    '/p2p-circuit/ip4/0.0.0.0/tcp/4002/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67',
    '/p2p-circuit/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67',
    '/p2p-circuit/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67'
  ],
  agentVersion: 'js-ipfs/0.33.1',
  protocolVersion: '9000'
}

const mockIpfsInfoWithExternal = {
  id: 'QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67',
  publicKey:
    'CAASpgIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCAa5Zevgv51ctXKREokKjJ4VcsgciqSJxeDBjwIBubqS2YAJSoSm0vkzOXS7dpwtRhrO4s2zHxrykPxyUao7Esq3G6fQsykPoqmISWo1FB5uR25MuaiZ/63XXFwE7/72IbBQxflTFI1s9x8Ie7BVPE6lfgqUD8i1NrII7HrQaoZ+L0rGSBsq/EHjJhlKM8/16vPM8c0JGS+cjxjuLUH4Ip/L66RRv65D4ucopQnogGNzHAmypGgFSvc0lzeh6lWI/2Ftf/PBUg6IHQ9JtKbeWaqaRJDI5vYLsNp3HJ3UMkr6DJ2j2c+Lqtf5RIuMyIxsZPTJoixKh8tc77OId7czrVAgMBAAE=',
  addresses: [
    '/ip4/127.0.0.1/tcp/4002/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67',
    '/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67',
    '/ip4/10.10.10.119/tcp/4002/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67',
    '/p2p-circuit/ip4/0.0.0.0/tcp/4002/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67',
    '/p2p-circuit/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67',
    '/p2p-circuit/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67'
  ],
  agentVersion: 'js-ipfs/0.33.1',
  protocolVersion: '9000'
}

const mockVerifiedPeers = [
  'Qmc8uaP9yegYmfxazB2YD7i6G4c2tnQRJvxYyWbM6w6pAm',
  'Qmc8uaP9yegYmfxazB2YD7i6G4c2tnQRJvxYyWbM6w6pBm',
  'Qmc8uaP9yegYmfxazB2YD7i6G4c2tnQRJvxYyWbM6w6pCm'
]

module.exports = {
  mockLatestData,
  mockIpfsInfoNoExternal,
  mockIpfsInfoWithExternal,
  mockVerifiedPeers
}
