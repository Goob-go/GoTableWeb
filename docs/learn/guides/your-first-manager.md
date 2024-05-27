# Your First Manager
Manager efficiently handles state and events, promoting modularity.

::: info ❔WHAT YOU'LL LEARN

⚫What is manager

⚫How to create a manager

⚫How to use your manager
:::

## Whats is manager?
Manager is state container that you can use to dispatch actions, listen state changes and event handling.

## Creating a manager
Lets create `BooksManager`, who will be responsible for managing the books.
```lua:line-numbers
local GoManager = require(ReplicatedStorage.GoManager)

export type BooksManager = GoManager.BasicManager<BooksState,BooksActions> 

export type BooksState = {
  books : {[string]:number?};
}

export type BooksActions = {  
  getBook : (book:string) -> ();
  putBook : (book:string)->();
}

local BooksManager = goManager.createManager({
  books = {}
},{
	getBook = function(self,book)
    local amountBooks = self.books[book]

    if not amountBooks or amountBooks == 0 then
      return
    end

    self:addValue({"books",book},-1)
  end,
  putBook = function(self,book)
    if not self.books[book] then
      self:setValue({"books",book},1)
      return
    end

    self:addValue({"books",book},1)
  end
}) :: BooksManager

return BooksManager
```
The manager consists of:
### State
The state is the data that your manager holds. What can only be modified by your actions.
### Actions
Actions are functions that modify your state.
### Built in methods
You can use them in actions to manipulation of your state.

Like : setValue,addValue,insertValue...
::: danger
Call the `destroy` method before setting nil.
:::
## Using a manager
Now that you've created a manager, you can do what you want with your condition.

```lua:line-numbers
BooksManager.putBook("Harry Potter")
BooksManager.putBook("Harry Potter")
BooksManager.getBook("Harry Potter")

print(BooksManager.books) --> {["Harry Potter"] = 1}
```

### You can also listen to the changes using listen

```lua
BooksManager:listen({"books"}):Connect(function(newV,oldV,field)
  print(`{field} : {oldV} -> {newV}`)
end)
```
**Output**
```
Harry Potter : nil -> 1
Harry Potter : 1 -> 2
Harry Potter : 2 -> 1
```
::: info
To disconnect from an listener, use the `Disconnect` method.
:::
## Summary
⚫Managers are state containers that hold your state and actions.

⚫Actions are functions that modify your state.

⚫State is the mmutable data that your manager holds.

⚫You can listen to changes in your state using listen.