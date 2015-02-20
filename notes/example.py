
todo_items = [{"number": "1", "label": "foo"}, {"number": "2", "label": "bar"}, {"number": "5", "label": "foo"}]

def ToDo_Item_Wrapper(item):
    '''
    Render a single item
    '''
    rendered_item = '''
                    <div class="todo-item" number="{item_number}">
                        <h1>{item_label}</h1>
                    </div>
                    '''.format(item_number=item["number"], item_label=item["label"])

    return rendered_item

def Make_ToDo_List(items_list):
    '''
    For a given list of items (here `todo_items` is that list) render the list of items
    '''

    print "Here is the state of the items list:", items_list

    list_of_rendered_items = []

    for item in items_list:
        # convert the list of items into a list of rendered strings
        list_of_rendered_items.append(ToDo_Item_Wrapper(item))
    
    print "Here is the rendered list of items: ", list_of_rendered_items

    #this is the starting fragement of the final html string
    rendered_list = '''
                    <div class="todo-list">
                        <ul>
                    '''
    for rendered_item in list_of_rendered_items:
        # one by one concat the rendered item string onto the end of the rendered list string
        rendered_list += '<li>' + rendered_item + '</li>'

    # finally concat the closing tags onto the fully rendered list
    rendered_list += '</ul></div>'

    print "Here is the fully rendered list:", rendered_list

    return rendered_list


if __name__ == "__main__":
    Make_ToDo_List(todo_items)
