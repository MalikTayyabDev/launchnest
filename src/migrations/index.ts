import * as migration_20260718_182338 from './20260718_182338';
import * as migration_20260719_072256 from './20260719_072256';

export const migrations = [
  {
    up: migration_20260718_182338.up,
    down: migration_20260718_182338.down,
    name: '20260718_182338',
  },
  {
    up: migration_20260719_072256.up,
    down: migration_20260719_072256.down,
    name: '20260719_072256'
  },
];
