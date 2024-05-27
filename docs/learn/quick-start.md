# Quick start
GoManager is a versatile and efficient library designed to simplify state management. You can easily create and manage stateful objects, allowing for smooth and organized handling of data and events within your program.
## Installation
You can get latest version from [GoManager](https://create.roblox.com/store/asset/16953542822/Go-Manager)

Modules -> GoManager -> Add

:tada:Congratulations, you have installed the GoManger.

## Start using GoManager
You're now ready to use GoManager! Create a `manager` with an initial state and actions.
```lua:line-numbers 
local goManager = require(ReplicatedStorage.GoManager)

type Manager = goManager.BasicManager<State,Actions>

type State = {
  coins : number
}

type Actions = {  
  increment : () -> () ;
}

local CoinsManager = goManager.createManager({
  coins = 0
},{
  increment = function(self)
    self:addValue({"coins"},3)
  end
}) :: Manager
```
## Using manager
You can call actions and listen changes of your state.
```lua:line-numbers 
CoinsManager:listen({"coins"}):Connect(function(newV,oldV,field)
  print(`{field} changed from {oldV} to {newV}`)
end)

CoinsManager.increment() --> coins changed from 0 to 3
```