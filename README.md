# ttrpg_app

Flavor Description - - - 
## To-Do

### Front End
- Suggested Technologies
    - React (Backbone)
    - PixiJS (Map and tokens)
    - Konva.js (Map and tokens)

- Setup main map page
    - tokens
        - token attributes
    - player control 

- Game Controls
    - Toolbar
    - Dice Roller
    - Initiative Tracker (DM only)

- Communication
    - Chat box/log
    
- Info Panels
    - Character sheets
    - Notes panel
    - Game events log (possibly record who's hit and stuff like that; definitely make optional, doesnt fit theme for some games)

- Tabs/Menu system

- User Management
    - login/logout
    - playerlist - show whos connected

- Settings/Utilities


### Back End
- Suggested Technologies
    - FastAPI (Backbone, async friendly)
    - Socket.IO (real-time comm)
    - Redis (in memory storage for game state)
    - PostgreSQL (persistent storage)
    - Auth system JWT and cookies
- User Auth
    - User/pass to start
    - Implement OAuth before any public release?
- Flow ->
    - Player joins ➜ Auth validated (FastAPI) ➜ WebSocket connects (Socket.IO)
    - ⬇
    - FastAPI checks Redis for active game session
    - ⬇
    - Player joins Socket.IO room for that session
    - ⬇
    - Game state synced from Redis ➜ Client starts interacting
    - ⬇
    - In-game actions (move token, roll dice, etc.) are handled by:



### Database
- Suggested Technologies
    - PostgreSQL
    - Redis
- Hybrid saving structure
    - Save to persistent database every X minutes, otherwise store game state in memory. 
    - Always save to data base on game state close
    - Process:
        - Game session starts w/ at least one player active
        - Save to memory constantly, update database every X minutes
        - On no players active, send final data and close session after 2 minutes of inactivity'

### Hosting
- Suggested Technologies
    - Docker
    - AWS

