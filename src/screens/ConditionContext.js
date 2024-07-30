import { createContext, useCallback, useState } from 'react';
import { URL } from '../URLs/URL';
import { EndPoints } from '../URLs/EndPoints';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { GetProfile, GetUser } from '../Slice/LoginAuthSlice';
const ConditionContext = createContext();

const ConditionProvider = ({ children }) => {
  const [condition, setCondition] = useState(false);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(GetUser()).then((a)=>{
        setCondition(a.payload.result.role)
      })
    }, []),
  );
  return (
    <ConditionContext.Provider value={{ condition, setCondition }}>
      {children}
    </ConditionContext.Provider>
  );
};

export { ConditionProvider, ConditionContext };