import googleTranslateApi from "@vitalets/google-translate-api";

async function translate(text) {
  
  try {
    const res = await googleTranslateApi(text, {to: 'en'});
    return res.text
  } 
  catch (error) {
    console.error(error)
    return null
  }
}

async function processText(text) {

  let openTag
  let closeTag
  let isTag = false
  let sliceText
  let result = ''
    
  while (text.length > 0) {  
    openTag = text.search(/<|&nbsp/)

    if (openTag == -1) {
      result += await translate(text)
      break
    }
    else {
      text[openTag] == '<' ? isTag = true : null
      
      sliceText = text.slice(0 , openTag)
      if (sliceText.length > 0) {
        result += await translate(sliceText)
      }
  
      closeTag = isTag ? text.indexOf('>') : openTag + 4            
      result += text.slice(openTag, closeTag + 1)
      text = text.slice(closeTag + 1)
      text = text.trim()
      isTag = false
    }
  }
  
  return result
}

export default async function handler(input) {

  let newDoc = []
  
  for (let item of input) {
    let objAux = {}
    for (let key in item) {
      let content = item[key].includes('_') ? item[key] : await processText( item[key])
      console.log(`Traduced... ==> ${content}`)
      objAux = {
        ...objAux,
        [key]: content
      }
    }
    newDoc.push(objAux)
  } 
  
  console.log("Input Translated!!!")
  return newDoc
}