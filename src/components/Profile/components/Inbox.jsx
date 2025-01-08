import React, { useEffect, useState } from 'react'
import { App as SendbirdApp, SendBirdProvider } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useUser } from '@supabase/auth-helpers-react';

import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';

function Inbox() {

    const user = useUser();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (user) {
            const id = (user.email).split('@')[0];
            setUserId(id);

        }
    })

    const [channelUrl, setChannelUrl] = useState();

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <SendBirdProvider appId={import.meta.env.VITE_SENDBIRD_APP_ID}
                userId={userId}
                nickname={user?.fullName}
                profileUrl={user?.imageUrl}
                allowProfileEdit={true}
            >
                <div className='grid grid-cols-1 gap-5 md:grid-cols-3 h-full'>
                    {/* Channel List    */}
                    <div className='p-5 border shadow-lg'>
                        <GroupChannelList
                            onChannelSelect={(channel) => {
                                setChannelUrl(channel?.url)
                            }}
                            channelListQueryParams={
                                {
                                    includeEmpty: true
                                }
                            }
                        />
                    </div>
                    {/* Channel /Message Area  */}
                    <div className='md:col-span-2 shadow-lg'>
                        <GroupChannel channelUrl={channelUrl} />
                    </div>
                </div>



            </SendBirdProvider>

        </div>
    )
}

export default Inbox