import React from "react";
import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Search = ()=>{
  const searchRecords = async (searchTerm) => {
    try {
      const recordsRef = collection(db, 'records');
      const q = query(recordsRef, where('fieldToSearch', '==', searchTerm));
      const querySnapshot = await getDocs(q);
  
      const results = [];
      querySnapshot.forEach((doc) => {
        const recordData = doc.data();
        results.push(recordData);
      });
  
      // Xử lý kết quả tìm kiếm
      console.log(results);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm bản ghi:', error);
    }
  };
  
    return (
        <div className="search">
        <div className="searchForm">
          <input
            type="text"
            placeholder="Find a group"
          />
        </div>
       
          <div className="userChat" >
            <img src='https://images.pexels.com/photos/17440855/pexels-photo-17440855/free-photo-of-den-va-tr-ng-th-i-trang-nh-ng-ng-i-dan-ba.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' alt="" />
            <div className="userChatInfo">
              <span>Group one</span>
            </div>
          </div>
      </div>
    )
}
export default Search;