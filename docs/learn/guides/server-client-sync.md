# Server-Client Sync
You can sync your state with client by `replicator` and get state on client by `receiver`.

::: info ❔WHAT YOU'LL LEARN
⚫How to share state between the server and clients

⚫How create replicators and receivers
:::

## Sync state
We need to create server and client side manager before start.

Let's create buy item system.
## Server

```lua:line-numbers
export type PlayerManager = GoManager.ServerManager<PlayerState,PlayerActions>

export type PlayerActions = {
  addItem : (item:string,amount:number)->(boolean?)
}

export type PlayerState = {
  items : {string},
  cash : number,
}

local itemsCost = {
  stick = 1,
}

local function newPlayer(player : Player)
  local PlayerManager = GoManager.createServerManager({
      items = {},
      cash = 10,
    },{
      addItem = function(self,_,item,amount)
        local itemCost = itemsCost[item]

        if not itemCost then return end

        local cost = itemCost*amount

        if cost > self.cash then return end

        self:addValue({"cash"},-cost)
        self:addValue({"items",item},amount)

        return true 
      end
    },{
      id = player.UserId,
      recipients = player
  }) :: PlayerManager

  PlayerManager.replicator:listenEvent("addItem"):Connect(PlayerManager.addItem)

  PlayerManager.replicator:start()  
end

return {
  new = newPlayer
}
```
We creating server manager with using `createServerManager`.

Then we listening to addItem event and connect addItem action.

Final step start replicator by method `start`.
::: info
⚫`Recipients` are players what be synced. Parameter can be "All",player,players.

⚫`id` is the identifier for the receiver.

⚫You can also use own remote by parameter `remote`.
:::
::: warning ⚠IMPORTANT
⚫Use a replicator to process events from the client.

⚫All changes are replicated by default, use params setValue(path,value,`{replicate=false}`) to prevent this from happening.
:::
::: danger
Call the `destroy` method before setting nil.
:::
## Client
```lua:line-numbers
local PlayerManager = GoManager.createClientManager(Players.LocalPlayer.UserId,{
    buyItem = function(self,item,amount)
        return self.receiver:sendEvent("addItem",item,amount)
    end
})

print(PlayerManager.buyItem("stick",1))--> true
```
We creating client manager with using `createClientManager`.

By buyItem action,we sending event to server.
::: warning ⚠IMPORTANT
⚫Use a receiver to process events from the client.

⚫All changes are replicated by default, use params setValue(path,value,`{replicate=false}`) to prevent this from happening.
:::
::: danger
Call the `destroy` method before setting nil.
:::
::: tip
You can create a separate module to store types for the client and server.
:::

## Other
### Allowing client change value
You can allow change value from client with `allowClientChangeValue` method.

#### Example

```lua:line-numbers
PlayerManager.replicator:allowClientChangeValue({"isMousePressed"},function(plr, path, value)
  return type(value) == "boolean"
end)
```
if validator return `true` then the change will be accepted.

You can cancel the permission by `prohibitClientChangeValue` method.
#### Example
```lua:line-numbers
PlayerManager.replicator:prohibitClientChangeValue({"isMousePressed"})
```
### Detect state synchronisation
To do this, you can use this `onFinishSyncState` event.
#### Example
```lua:line-numbers
PlayerManager.replicator.onFinishSyncState:Once(function(player)
  print(`{player.Name} finished syncing`)
end)
```

## Summary

⚫You can share state between server-client by using `replicator` and `receiver`.

⚫To create replicator and receiver , use `createServerManager` and `createClientManager`.