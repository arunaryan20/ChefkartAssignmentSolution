import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native'
import React,{useState,useEffect} from 'react'

const FView = ({navigation}) => {
const[vegetables,setVegetables]=useState("")
const[spices,setSpices]=useState("")
const[appliances,setAppliances]=useState("")
const[alldata,setAllData]=useState("")
  const fetchData=async()=>{
    try{
     await fetch("https://8b648f3c-b624-4ceb-9e7b-8028b7df0ad0.mock.pstmn.io/dishes/v1/1",{
         method:"GET",
         headers:{
           Accept:"application/json",
           "Content-Type":"application/json",
         }
      }).then((res)=>{
         res.json().then((data)=>{
             console.log("data--------->",data)
             setAllData(data)
             setVegetables(data.ingredients.vegetables)
             setSpices(data.ingredients.spices)
             setAppliances(data.ingredients.appliances)
         }).catch((error)=>{
             console.log("data error------->",error)
         })
      }).catch((error)=>{
         console.log("this is error----->",error)
      })
    }catch(error){
       console.log("catch error------>",error)
    }
}

useEffect(()=>{
fetchData()
},[])




     const tempData=[
      {
        name:"1"
      },
      {
        name:"2"
      },
      {
        name:"3"
      },
      {
        name:"4"
      },

    ]

  return (
    <View>
      <ScrollView>
      
        <TouchableOpacity
          style={{backgroundColor:"white"}}
          onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../Assets/left.png')}
            style={{height: 30, width: 30, tintColor: 'black',margin:10}}
          />
        </TouchableOpacity>
        <View style={{padding: 20, backgroundColor: 'white'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 24,
                color: 'black',
              }}>
             {alldata.name}
            </Text>
            <View style={styles.star1}>
              <Text style={{color: 'white'}}>4.2 *</Text>
            </View>
          </View>
          <Text style={{color: '#9c9c9c', fontSize: 15, paddingTop: 5}}>
            Chickens are average-sized fowls, characterized by smaller heads,
            short beaks and wings, and a round body perched on featherless legs.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 20,
              alignItems: 'center',
            }}>
            <Image
              source={require('../Assets/clock.png')}
              style={{height: 20, width: 20}}
            />
            <Text style={{color: 'black', fontSize: 17}}> {alldata.timeToPrepare}</Text>
          </View>
        </View>
        <View style={{padding: 20, marginTop: 10, backgroundColor: 'white'}}>
          <Text style={{color: 'black', fontSize: 22, fontWeight: '500'}}>
            Ingredients
          </Text>
          <Text
            style={{color: 'black', opacity: 0.5, fontSize: 15, paddingTop: 5}}>
            For 2 people
          </Text>
          <View style={styles.line}></View>
          <View style={{flexDirection:"row",alignItems:"center"}}>
            <Text style={{color:"black",fontSize:18,fontWeight:"500"}}>Vegetables ({vegetables.length})   </Text>
            <Image
              source={require('../Assets/downward-arrow.png')}
              style={{height: 20, width: 20}}
            />
          </View>
          <View>
            <FlatList 
                 data={vegetables}
                 renderItem={({item})=>
                    <View style={{flexDirection:"row",gap:180,padding:5}}>
                      <Text style={styles.vg_name_txt}>{item.name}</Text>
                      <Text style={styles.vg_name_txt}>{item.quantity}</Text>
                      </View>
                }
            />
          </View>
          <View style={{flexDirection:"row",alignItems:"center"}}>
            <Text style={{color:"black",fontSize:18,fontWeight:"500"}}>Spices ({spices.length})   </Text>
            <Image
              source={require('../Assets/downward-arrow.png')}
              style={{height: 20, width: 20}}
            />
          </View>
          <View>
            <FlatList 
                 data={spices}
                 renderItem={({item})=>
                    <View style={{flexDirection:"row",gap:170,padding:5}}>
                      <Text style={styles.vg_name_txt}>{item.name}</Text>
                      <Text style={styles.vg_name_txt}>{item.quantity}</Text>
                      </View>
                }
            />
          </View>
          <Text style={{color: 'black', fontSize: 22, fontWeight: '500',paddingTop:20}}>
            Appliances
          </Text>
          <View>
            <FlatList 
                 data={appliances}
                 horizontal={true}
                 renderItem={({item})=>
                    <View style={{padding:5,alignItems:"center"}}>
                     <Image 
                     source={{uri:"https://www.lg.com/in/images/refrigerators/md07570279/gallery/GL-T382TPZX-Refrigerators-Front-View-D01.jpg"}}
                     style={{height:150,width:100}}
                     />
                      <Text style={styles.vg_name_txt}>{item.name}</Text>
                      </View>
                }
            />
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

export default FView

const styles = StyleSheet.create({
  star1: {
    height: 20,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#88d789',
    marginLeft: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  line: {
    borderWidth: 0.5,
    borderColor: 'black',
    width: '90%',
    opacity: 0.5,
    alignSelf: 'center',
    margin: 20,
  },
  vg_name_txt:{color:"black",opacity:0.5,fontSize:15},
})
