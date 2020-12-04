export const stateConditionString = state => {
    let navigateTo = '';
    if (state.isLoading) {
        navigateTo = 'LOAD_APP';
    }
    if (state.isSignedIn && state.userToken && state.isSignedUp) {
        if (!state.plantIsSetup) {
            navigateTo = 'TO_SETUP_PAGE';
        } else {
            navigateTo = 'LOAD_HOME';
        }
    }
    if (!state.isSignedUp && state.noAccount) {
        navigateTo = 'LOAD_SIGNUP';
    }
    if (!state.isSignedIn && !state.noAccount) {
        navigateTo = 'LOAD_SIGNIN';
    }
    return navigateTo;
};