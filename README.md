# dataListForm
Simple javascript datalist for your forms

## Configuration

```javascript
setDatalist(htmlElement, listOfData, callback);
```

* **htmlElement :** The class *(.element)* or ID *(#element)* of your HTML element that contain the datalist form *(show the example.html)*
* **listOfData :** An array that contain a list of datas that you want use in the form *(**optional**, use "null" if you want to unuse it)*
* **callback :** The function that you want to call when an element will be selected in the form (***optional***). The callback's first param will be the selected element.
