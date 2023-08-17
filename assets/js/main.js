
  let opts = document.querySelector("[name = 'category']")
  if(opts != null){
    opts = opts.options
    let category = document.querySelector("[name = 'category']").getAttribute("data-category-now")


  for(let opt of opts){
      if(opt.value == category){
          opt.selected = true
      }else{
        opt.selected = false
      }
  }
  }






  
  let statusItems = document.querySelectorAll("[name = 'wStatus']")
if(statusItems != null){
  statusItems = Array.from(statusItems)

  for(let statusItem of statusItems){
    opts = Array.from(statusItem.options)
  
    let status = statusItem.getAttribute("data-status")

    for(let opt of opts){
        if(opt.value == status){
            opt.selected = true
            console.log(opt.value)
        }else{
          opt.selected = false
        } 
    }
  }
}