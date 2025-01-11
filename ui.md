## Description

<ui/> is the root element int Helium view files. All other view components are placed within it. This will in most cases be standard and can be used exactly as shown in the example below.

## Example
    
    
    <?xml version="1.0" encoding="UTF-8"?>
    <ui xmlns="http://uiprogram.mezzanine.com/View"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://uiprogram.mezzanine.com/View ../View.xsd">
        .
        .
    </ui>

  * `xmlns="http://uiprogram.mezzanine.com/View"`

Indicates that the default namespace is `http://uiprogram.mezzanine.com/View`


  * `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"`

Indicates that the elements and data types used in the schema come from the `http://www.w3.org/2001/XMLSchema-instance` namespace. It also specifies that the elements and data types that come from the `http://www.w3.org/2001/XMLSchema-instance` namespace should be prefixed with **xsi:**


  * `xsi:schemaLocation="http://uiprogram.mezzanine.com/View ../View.xsd"`

Indicates the schema location. First the namespace to use is specified followed by a space followed by the relative path to the actual XML schema to use for that namespace.



Note that when using the [Helium Netbeans Plugin (deprecated)](/wiki/spaces/HTUT/pages/5741359/Helium+Netbeans+Plugin+deprecated), it is not required to specify the schema location as shown above. The plugin will automatically download and include the latest version of the Helium **`View.xsd`**.
