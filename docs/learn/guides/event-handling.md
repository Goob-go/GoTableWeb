# Events Handling
In manager you can send events and handling it.

::: info ❔WHAT YOU'LL LEARN
⚫What is events

⚫What types of events are available

⚫How send event

⚫How handle event
:::

## Whats is events?
Events are communication triggers signaling specific occurrences within a system.
## Types of events
In GoManager available two types : Async event and Sync event.

## About Async event
This is when an event is executed in another thread without blocking the current one.
### Example

```lua:line-numbers
Manager:listenAsyncEvent("roundEnded"):Connect(function()
  print("Round has ended")
end)

Manager:sendAsyncEvent("roundEnded")
```
**Output**
```
Round has ended
```
### Continue current communication
You can continue current communication with andThen method.
#### Example

```lua:line-numbers
Manager:listenAsyncEvent("travel"):Connect(function(country)
  print(country)-->Spain
  return "France"
end):AndThen(function()
  return "Spain"
end)

Manager:sendAsyncEvent("travel","Spain"):AndThen(function(country)
  print(country)--> France
end):AndThen(function(country)
  print(country)--> Spain
end)
```
::: info
To disconnect from an event, use the `Disconnect` method.
:::

## About Sync event
This is when an event is executed in the current thread and blocks it.
### Example
```lua:line-numbers
Manager:listenEvent("addItem"):Connect(function(item)
    ...
    return success -- true or false
end)
-- waits for the listener to return the result
print(Manager:sendEvent("addItem","stick")) --> Can be true or false depends on the result
```

::: warning
You can only connect one listener to the event.
:::
::: info
⚫Events handling supports replecation, by ["server-client sync"](/learn/guides/server-client-sync).

⚫To disconnect from an event, use the `Disconnect` method.
:::
## Summary

⚫Manager handles two types of events: Async and Sync.

⚫Use sendAsyncEvent and sendEvent to send events. Connect listeners with listenAsyncEvent or listenEvent.

⚫Events are communication triggers.