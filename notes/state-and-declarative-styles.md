# A breif primer declaritive programming


## Functions

A function is something that take input x, performs some transformation, and returns value f(x). 

```
def f(x):
  '''
  double any input number, same as `f(x) = 2*x`

  eg:
    f(2) -> 4
    f(4) -> 8
    ...

  '''
  return 2*x

def g(x):
  '''
  render any string to an h1 tag

  eg:
    g("foo") -> "<h1>foo</h1>"
    g("bar") -> "<h1>bar</h1>"
  '''
  return "<h1>{x_as_string}</h1>".format(x_as_string=string(x))
```

Similarly, you can have functions that call other functions based on some logic:

```
def h(x):
  '''
  choose to call either f(x) or g(x) based on the value of x.
  if x == Integer -> f(x)
  else            -> g(x)

  eg:
    h(2)   -> 4
    h("2") -> "<h1>2</h1>"
  '''
  if isinstance(x,Integer):
    return f(x)
  else:
    returh g(x)
```

In declaritive languages, you have functions that are composed (they call/use each other) together to process ones data. Ok, cool -- but what the hell is state!

## State

State can be thought of as everything that you aren't able to describe with functions -- it's everything else. Simply if f(x) is a function then x is the state. State can include global variables as well.

The reason these notions are important to you is due to how react wants to be used -- it want's a "View" (functions) that map over "State" (data) to render html.

### example


```

```

And here's the output:

```
Here is the state of the items list: [{'number': '1', 'label': 'foo'}, {'number': '2', 'label': 'bar'}, {'number': '5', 'label': 'foo'}]
Here is the rendered list of items:  ['\n                    <div class="todo-item" number="1">\n                        <h1>foo</h1>\n                    </div>\n                    ', '\n                    <div class="todo-item" number="2">\n                        <h1>bar</h1>\n                    </div>\n                    ', '\n                    <div class="todo-item" number="5">\n                        <h1>foo</h1>\n                    </div>\n                    ']
Here is the fully rendered list: 
                    <div class="todo-list">
                        <ul>
                    <li>
                    <div class="todo-item" number="1">
                        <h1>foo</h1>
                    </div>
                    </li><li>
                    <div class="todo-item" number="2">
                        <h1>bar</h1>
                    </div>
                    </li><li>
                    <div class="todo-item" number="5">
                        <h1>foo</h1>
                    </div>
                    </li></ul></div>

```
