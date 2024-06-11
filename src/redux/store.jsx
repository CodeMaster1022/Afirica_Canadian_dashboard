import { configureStore } from '@reduxjs/toolkit';
import { communityReducer } from './communityRelated/communitySlice';
import { mapFilterReducer } from './mapRelated/mapSlice';
import { updatesReducer } from './updateSlice/updateSlice';
import { usersReducer } from './userRelated/userSlice';
import { groupReducer } from './groupRelated/groupSlice';
import { resourceReducer } from './resourceRelated/resourceSlice';
import { statusReducer } from './statusRelated/statusSlice';
import { groupMemberReducer } from './groupRelated/groupMemberSlice';
import { placesReducer } from './placesRelated/placesSlice';
import { surveyReducer } from './surveyRelated/surveySlice';
import { eventReducer } from './eventRelated/eventSlice';
import { jobReducer } from './jobRelated/jobsSlice';
import { educationReducer } from './education/educationSlice';
import { serviceReducer } from './serviceRelated/serviceSlice';
import { categoryReducer } from './categoryRelated/categorySlice';
const store = configureStore({
  reducer: {
    community: communityReducer,
    places: placesReducer,
    mapFilter: mapFilterReducer,
    updates: updatesReducer,
    users: usersReducer,
    group: groupReducer,
    resource: resourceReducer,
    status: statusReducer,
    groupMember: groupMemberReducer,
    survey: surveyReducer,
    event: eventReducer,
    job: jobReducer,
    education: educationReducer,
    service: serviceReducer,
    category: categoryReducer
  }
});

export default store;
