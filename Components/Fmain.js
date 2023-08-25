import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native'
import React,{useState,useEffect} from 'react'
import SelectDropdown from 'react-native-select-dropdown'
const Fmain = ({navigation}) => {
         const[dishes,setDishes]=useState("")
         const [popularfood,setPopularFood]=useState("")

         const fetchData=async()=>{
               try{
                await fetch("https://8b648f3c-b624-4ceb-9e7b-8028b7df0ad0.mock.pstmn.io/dishes/v1/",{
                    method:"GET",
                    headers:{
                      Accept:"application/json",
                      "Content-Type":"application/json",
                    }
                 }).then((res)=>{
                    res.json().then((data)=>{
                        console.log("data--------->",data.dishes)
                        setDishes(data.dishes)
                        setPopularFood(data.popularDishes)
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


  const dishes_type = ['Recomended', 'Latest']
  const symbol1 = '>'
  const food_type = [
    {
      type: 'italian',
    },
    {
      type: 'indian',
    },
    {
      type: 'indian',
    },
    {
      type: 'indian',
    },
  ]

  return (
    <View style={{flex:1}}>
      <View style={styles.topv}>
        <TouchableOpacity>
          <Image
            source={require('../Assets/left.png')}
            style={{height: 30, width: 30, tintColor: 'black'}}
          />
        </TouchableOpacity>
        <Text style={{color: 'black', fontSize: 20, marginLeft: 20}}>
          Select Dishes
        </Text>
      </View>

      <View style={styles.blank}></View>
      <View style={styles.dtv}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../Assets/calendar.png')}
            style={{height: 20, width: 20}}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: '500',
              paddingLeft: 5,
            }}>
            21 May 2021
          </Text>
        </View>
        <View style={styles.linev}></View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../Assets/alarm-clock.png')}
            style={{height: 20, width: 20}}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: '500',
              paddingLeft: 5,
            }}>
            10:30 Pm- 12:30 Pm
          </Text>
        </View>
      </View>
      <View style={{marginTop: 55}}>
        <FlatList
          data={food_type}
          horizontal={true}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.typev}>
              <Text style={{color: 'black'}}>{item.type}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Text
        style={{color: 'black', fontSize: 20, marginLeft: 20, marginTop: 20}}>
        Popular Dishes
      </Text>
      <View>
        <FlatList
          data={popularfood}
          horizontal={true}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.popularv}>
              <ImageBackground
                source={{
                  uri: item.image
                }}
                imageStyle={{borderRadius: 50}}
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: '600',fontSize:10}}>{item.name}</Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{flexDirection: 'row', alignSelf: 'center', gap: 100,marginTop:20,marginBottom:10}}>
        <SelectDropdown
          defaultButtonText='filter'
          buttonStyle={styles.dropdownbtn}
          data={dishes_type}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        <TouchableOpacity style={styles.menuv}>
          <Text style={{color: 'white'}}>Menu</Text>
        </TouchableOpacity>
      </View>
      
        <FlatList
          data={dishes}
          renderItem={({item}) => (
            <View style={styles.mainv}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: 'black', fontSize: 18}}>
                    {item.name}
                  </Text>
                  <View style={styles.star}>
                    <Text style={{color: '#88d789'}}>*</Text>
                  </View>
                  <View style={styles.star1}>
                    <Text style={{color: 'white'}}>{item.rating} *</Text>
                  </View>
                </View>
                <View style={{marginTop: 10}}>
                  <Text
                    style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                    Ingredients
                  </Text>
                  <TouchableOpacity onPress={()=>navigation.navigate("FView")} style={{marginTop: 5}}>
                    <Text style={{color: '#ffb765'}}>View List {symbol1} </Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: '72%'}}>
                  <Text style={{color: '#9c9c9c', fontSize: 15}}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <Image
                source={{
                  uri: item.image
                }}
                style={{height: 80, width: 80, borderRadius: 8,position:"absolute",marginLeft:"75%",marginTop:10}}
              />
              <TouchableOpacity style={styles.addbtn}>
                <Text style={{color:"#ffa033",fontSize:10,fontWeight:"600",paddingLeft:40,position:"absolute"}}>+</Text>
                <Text style={{color:"#ffa033",fontSize:15,fontWeight:"600",paddingTop:3}}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      
    </View>
  )
}

export default Fmain

const styles = StyleSheet.create({
  topv: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  blank: {
    height: 50,
    width: '100%',
    backgroundColor: '#1c1c1c',
  },
  dtv: {
    height: 60,
    width: '85%',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 8,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linev: {
    height: 30,
    borderWidth: 0.5,
    borderColor: 'black',
    marginLeft: 5,
    marginRight: 5,
    opacity: 0.5,
  },
  typev: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    height: 30,
    width: 100,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 10,
  },
  popularv: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ffaa49',
    height: 70,
    width: 70,
    marginLeft: 20,
    marginTop: 10,
    marginRight:5,

  },
  dropdownbtn: {
    backgroundColor: 'white',
    height: 40,
    width: 150,
    elevation: 10,
    borderRadius: 10,
  },
  menuv: {
    height: 40,
    width: 80,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  star: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#88d789',
    marginLeft: 10,
  },
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
  mainv: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
    width:"96%",
  },
  addbtn:{
    position:"absolute",
    height:30,
    width:20,
    borderWidth:1,
    borderColor:"#ffa033",
    alignItems:"center",
    borderRadius:5,
    marginTop:70,
    marginLeft:"78%",
    backgroundColor:"white",
  }
})
